import { isLocal } from "config/env";
import { getOracleKeeperNextIndex, getOracleKeeperUrl } from "config/oracleKeeper";
import { getNormalizedTokenSymbol } from "config/tokens";
import { TIMEZONE_OFFSET_SEC } from "domain/prices/constants";
import { Bar, FromNewToOldArray } from "domain/tradingview/types";
import { buildUrl } from "lib/buildUrl";
import {
  BatchReportBody,
  DayPriceCandle,
  OracleFetcher,
  RawIncentivesStats,
  TickersResponse,
  UserFeedbackBody,
} from "./types";

function parseOracleCandle(rawCandle: number[]): Bar {
  const [timestamp, open, high, low, close] = rawCandle;
  return {
    time: timestamp + TIMEZONE_OFFSET_SEC,
    open,
    high,
    low,
    close,
  };
}

function parseOracleCandle_bsc(rawCandle: any[]): Bar {
  const [timestamp, open, high, low, close, , , , , , ,] = rawCandle;
  return {
    time: timestamp / 1000 + TIMEZONE_OFFSET_SEC,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}
function parseOracleCandle_pio(rawCandle: any[]): Bar {
  const [timestamp, open, high, low, close, , , , , , ,] = rawCandle;

  return {
    time: timestamp / 1000 + TIMEZONE_OFFSET_SEC,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}

let fallbackThrottleTimerId: any;

export class OracleKeeperFetcher implements OracleFetcher {
  private readonly chainId: number;
  private readonly oracleKeeperIndex: number;
  private readonly setOracleKeeperInstancesConfig?: (
    setter: (old: { [chainId: number]: number } | undefined) => {
      [chainId: number]: number;
    }
  ) => void;
  public readonly url: string;
  private readonly forceIncentivesActive: boolean;

  constructor(p: {
    chainId: number;
    oracleKeeperIndex: number;
    setOracleKeeperInstancesConfig?: (
      setter: (old: { [chainId: number]: number } | undefined) => {
        [chainId: number]: number;
      }
    ) => void;
    forceIncentivesActive: boolean;
  }) {
    this.chainId = p.chainId;
    this.oracleKeeperIndex = p.oracleKeeperIndex;
    this.setOracleKeeperInstancesConfig = p.setOracleKeeperInstancesConfig;
    this.url = getOracleKeeperUrl(this.chainId, this.oracleKeeperIndex);
    this.forceIncentivesActive = p.forceIncentivesActive;
  }

  switchOracleKeeper() {
    if (fallbackThrottleTimerId || !this.setOracleKeeperInstancesConfig) {
      return;
    }

    const nextIndex = getOracleKeeperNextIndex(this.chainId, this.oracleKeeperIndex);

    if (nextIndex === this.oracleKeeperIndex) {
      // eslint-disable-next-line no-console
      console.error(`no available oracle keeper for chain ${this.chainId}`);
      return;
    }

    // eslint-disable-next-line no-console

    this.setOracleKeeperInstancesConfig((old) => {
      return { ...old, [this.chainId]: nextIndex };
    });

    fallbackThrottleTimerId = setTimeout(() => {
      fallbackThrottleTimerId = undefined;
    }, 5000);
  }

  fetchTickers(): Promise<TickersResponse> {
    return fetch(buildUrl(this.url!, "/prices/tickers"))
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) {
          throw new Error("Invalid tickers response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();

        throw e;
      });
  }

  fetch24hPrices(): Promise<DayPriceCandle[]> {
    return fetch(buildUrl(this.url!, "/prices/24h"))
      .then((res) => res.json())
      .then((res) => {
        if (!res?.length) {
          throw new Error("Invalid 24h prices response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  fetchPostBatchReport(body: BatchReportBody, debug?: boolean): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    if (isLocal()) {
      return Promise.resolve(new Response());
    }

    return fetch(buildUrl(this.url!, "/report/ui/batch_report"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  fetchPostFeedback(body: UserFeedbackBody, debug): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    return fetch(buildUrl(this.url!, "/report/ui/feedback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async fetchOracleCandles(tokenSymbol: string, period: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    tokenSymbol = getNormalizedTokenSymbol(tokenSymbol);

    return fetch(buildUrl(this.url!, "/prices/candles", { tokenSymbol, period, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res.candles) || (res.candles.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.candles.map(parseOracleCandle);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  async fetchOracleCandles_bsc(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    symbol = getNormalizedTokenSymbol(symbol);

    return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.map(parseOracleCandle_bsc);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  // async fetchOracleCandles_pio(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
  //   symbol = getNormalizedTokenSymbol(symbol);

  //   return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
  //         throw new Error("Invalid candles response");
  //       }
  //       // console.log("res=========>", res.map(parseOracleCandle_bsc));
  //       return res.map(parseOracleCandle_pio);
  //     })
  //     .catch((e) => {
  //       // eslint-disable-next-line no-console
  //       console.error(e);
  //       this.switchOracleKeeper();
  //       throw e;
  //     });
  // }

  async fetchIncentivesRewards(): Promise<RawIncentivesStats | null> {
    return fetch(
      buildUrl(this.url!, "/incentives", {
        ignoreStartDate: this.forceIncentivesActive ? "1" : undefined,
      })
    )
      .then((res) => res.json())
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        return null;
      });
  }
}

export class OracleKeeperFetcher_1 implements OracleFetcher {
  private readonly chainId: number;
  private readonly oracleKeeperIndex: number;
  private readonly setOracleKeeperInstancesConfig?: (
    setter: (old: { [chainId: number]: number } | undefined) => {
      [chainId: number]: number;
    }
  ) => void;
  public readonly url: string;
  private readonly forceIncentivesActive: boolean;

  constructor(p: {
    chainId: number;
    oracleKeeperIndex: number;
    setOracleKeeperInstancesConfig?: (
      setter: (old: { [chainId: number]: number } | undefined) => {
        [chainId: number]: number;
      }
    ) => void;
    forceIncentivesActive: boolean;
  }) {
    this.chainId = p.chainId;
    this.oracleKeeperIndex = p.oracleKeeperIndex;
    this.setOracleKeeperInstancesConfig = p.setOracleKeeperInstancesConfig;
    this.url = getOracleKeeperUrl(this.chainId, this.oracleKeeperIndex);
    this.forceIncentivesActive = p.forceIncentivesActive;
  }

  switchOracleKeeper() {
    if (fallbackThrottleTimerId || !this.setOracleKeeperInstancesConfig) {
      return;
    }

    const nextIndex = getOracleKeeperNextIndex(this.chainId, this.oracleKeeperIndex);

    if (nextIndex === this.oracleKeeperIndex) {
      // eslint-disable-next-line no-console
      console.error(`no available oracle keeper for chain ${this.chainId}`);
      return;
    }

    // eslint-disable-next-line no-console

    this.setOracleKeeperInstancesConfig((old) => {
      return { ...old, [this.chainId]: nextIndex };
    });

    fallbackThrottleTimerId = setTimeout(() => {
      fallbackThrottleTimerId = undefined;
    }, 5000);
  }

  fetchTickers(): Promise<TickersResponse> {
    return fetch(buildUrl(this.url!, "/prices/tickers"))
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) {
          throw new Error("Invalid tickers response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();

        throw e;
      });
  }

  fetch24hPrices(): Promise<DayPriceCandle[]> {
    return fetch(buildUrl(this.url!, "/prices/24h"))
      .then((res) => res.json())
      .then((res) => {
        if (!res?.length) {
          throw new Error("Invalid 24h prices response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  fetchPostBatchReport(body: BatchReportBody, debug?: boolean): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    if (isLocal()) {
      return Promise.resolve(new Response());
    }

    return fetch(buildUrl(this.url!, "/report/ui/batch_report"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  fetchPostFeedback(body: UserFeedbackBody, debug): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    return fetch(buildUrl(this.url!, "/report/ui/feedback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async fetchOracleCandles(tokenSymbol: string, period: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    tokenSymbol = getNormalizedTokenSymbol(tokenSymbol);

    return fetch(buildUrl(this.url!, "/prices/candles", { tokenSymbol, period, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res.candles) || (res.candles.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.candles.map(parseOracleCandle);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  async fetchOracleCandles_bsc(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    symbol = getNormalizedTokenSymbol(symbol);

    return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        // console.log("res=========>", res.map(parseOracleCandle_bsc));
        return res.map(parseOracleCandle_bsc);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  // async fetchOracleCandles_pio(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
  //   symbol = getNormalizedTokenSymbol(symbol);

  //   return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
  //         throw new Error("Invalid candles response");
  //       }
  //       // console.log("res=========>", res.map(parseOracleCandle_bsc));
  //       return res.map(parseOracleCandle_pio);
  //     })
  //     .catch((e) => {
  //       // eslint-disable-next-line no-console
  //       console.error(e);
  //       this.switchOracleKeeper();
  //       throw e;
  //     });
  // }

  async fetchIncentivesRewards(): Promise<RawIncentivesStats | null> {
    return fetch(
      buildUrl(this.url!, "/incentives", {
        ignoreStartDate: this.forceIncentivesActive ? "1" : undefined,
      })
    )
      .then((res) => res.json())
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        return null;
      });
  }
}

export class OracleKeeperFetcher_2 implements OracleFetcher {
  private readonly chainId: number;
  private readonly oracleKeeperIndex: number;
  private readonly setOracleKeeperInstancesConfig?: (
    setter: (old: { [chainId: number]: number } | undefined) => {
      [chainId: number]: number;
    }
  ) => void;
  public readonly url: string;
  private readonly forceIncentivesActive: boolean;

  constructor(p: {
    chainId: number;
    oracleKeeperIndex: number;
    setOracleKeeperInstancesConfig?: (
      setter: (old: { [chainId: number]: number } | undefined) => {
        [chainId: number]: number;
      }
    ) => void;
    forceIncentivesActive: boolean;
  }) {
    this.chainId = p.chainId;
    this.oracleKeeperIndex = p.oracleKeeperIndex;
    this.setOracleKeeperInstancesConfig = p.setOracleKeeperInstancesConfig;
    this.url = getOracleKeeperUrl(this.chainId, this.oracleKeeperIndex);
    this.forceIncentivesActive = p.forceIncentivesActive;
  }

  switchOracleKeeper() {
    if (fallbackThrottleTimerId || !this.setOracleKeeperInstancesConfig) {
      return;
    }

    const nextIndex = getOracleKeeperNextIndex(this.chainId, this.oracleKeeperIndex);

    if (nextIndex === this.oracleKeeperIndex) {
      // eslint-disable-next-line no-console
      console.error(`no available oracle keeper for chain ${this.chainId}`);
      return;
    }

    // eslint-disable-next-line no-console

    this.setOracleKeeperInstancesConfig((old) => {
      return { ...old, [this.chainId]: nextIndex };
    });

    fallbackThrottleTimerId = setTimeout(() => {
      fallbackThrottleTimerId = undefined;
    }, 5000);
  }

  fetchTickers(): Promise<TickersResponse> {
    return fetch(buildUrl(this.url!, "/prices/tickers"))
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) {
          throw new Error("Invalid tickers response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();

        throw e;
      });
  }

  fetch24hPrices(): Promise<DayPriceCandle[]> {
    return fetch(buildUrl(this.url!, "/prices/24h"))
      .then((res) => res.json())
      .then((res) => {
        if (!res?.length) {
          throw new Error("Invalid 24h prices response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  fetchPostBatchReport(body: BatchReportBody, debug?: boolean): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    if (isLocal()) {
      return Promise.resolve(new Response());
    }

    return fetch(buildUrl(this.url!, "/report/ui/batch_report"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  fetchPostFeedback(body: UserFeedbackBody, debug): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    return fetch(buildUrl(this.url!, "/report/ui/feedback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async fetchOracleCandles(tokenSymbol: string, period: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    tokenSymbol = getNormalizedTokenSymbol(tokenSymbol);

    return fetch(buildUrl(this.url!, "/prices/candles", { tokenSymbol, period, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res.candles) || (res.candles.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.candles.map(parseOracleCandle);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  async fetchOracleCandles_bsc(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    symbol = getNormalizedTokenSymbol(symbol);

    return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        // console.log("res=========>", res.map(parseOracleCandle_bsc));
        return res.map(parseOracleCandle_bsc);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  // async fetchOracleCandles_pio(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
  //   symbol = getNormalizedTokenSymbol(symbol);

  //   return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
  //         throw new Error("Invalid candles response");
  //       }
  //       // console.log("res=========>", res.map(parseOracleCandle_bsc));
  //       return res.map(parseOracleCandle_pio);
  //     })
  //     .catch((e) => {
  //       // eslint-disable-next-line no-console
  //       console.error(e);
  //       this.switchOracleKeeper();
  //       throw e;
  //     });
  // }

  async fetchIncentivesRewards(): Promise<RawIncentivesStats | null> {
    return fetch(
      buildUrl(this.url!, "/incentives", {
        ignoreStartDate: this.forceIncentivesActive ? "1" : undefined,
      })
    )
      .then((res) => res.json())
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        return null;
      });
  }
}

export class OracleKeeperFetcher_bsc implements OracleFetcher {
  private readonly chainId: number;
  private readonly oracleKeeperIndex: number;
  private readonly setOracleKeeperInstancesConfig?: (
    setter: (old: { [chainId: number]: number } | undefined) => {
      [chainId: number]: number;
    }
  ) => void;
  public readonly url: string;
  private readonly forceIncentivesActive: boolean;

  constructor(p: {
    chainId: number;
    oracleKeeperIndex: number;
    setOracleKeeperInstancesConfig?: (
      setter: (old: { [chainId: number]: number } | undefined) => {
        [chainId: number]: number;
      }
    ) => void;
    forceIncentivesActive: boolean;
  }) {
    this.chainId = p.chainId;
    this.oracleKeeperIndex = p.oracleKeeperIndex;
    this.setOracleKeeperInstancesConfig = p.setOracleKeeperInstancesConfig;
    this.url = getOracleKeeperUrl(this.chainId, this.oracleKeeperIndex);
    this.forceIncentivesActive = p.forceIncentivesActive;
  }

  switchOracleKeeper() {
    if (fallbackThrottleTimerId || !this.setOracleKeeperInstancesConfig) {
      return;
    }

    const nextIndex = getOracleKeeperNextIndex(this.chainId, this.oracleKeeperIndex);

    if (nextIndex === this.oracleKeeperIndex) {
      // eslint-disable-next-line no-console
      console.error(`no available oracle keeper for chain ${this.chainId}`);
      return;
    }

    // eslint-disable-next-line no-console

    this.setOracleKeeperInstancesConfig((old) => {
      return { ...old, [this.chainId]: nextIndex };
    });

    fallbackThrottleTimerId = setTimeout(() => {
      fallbackThrottleTimerId = undefined;
    }, 5000);
  }

  fetchTickers(): Promise<TickersResponse> {
    return fetch(buildUrl(this.url!, "/prices/tickers"))
      .then((res) => res.json())
      .then((res) => {
        if (!res.length) {
          throw new Error("Invalid tickers response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();

        throw e;
      });
  }

  fetch24hPrices(): Promise<DayPriceCandle[]> {
    return fetch(buildUrl(this.url!, "/prices/24h"))
      .then((res) => res.json())
      .then((res) => {
        if (!res?.length) {
          throw new Error("Invalid 24h prices response");
        }

        return res;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  fetchPostBatchReport(body: BatchReportBody, debug?: boolean): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    if (isLocal()) {
      return Promise.resolve(new Response());
    }

    return fetch(buildUrl(this.url!, "/report/ui/batch_report"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  fetchPostFeedback(body: UserFeedbackBody, debug): Promise<Response> {
    if (debug) {
      // eslint-disable-next-line no-console
    }

    return fetch(buildUrl(this.url!, "/report/ui/feedback"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  async fetchOracleCandles(tokenSymbol: string, period: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    tokenSymbol = getNormalizedTokenSymbol(tokenSymbol);

    return fetch(buildUrl(this.url!, "/prices/candles", { tokenSymbol, period, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res.candles) || (res.candles.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.candles.map(parseOracleCandle);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  async fetchOracleCandles_bsc(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
    symbol = getNormalizedTokenSymbol(symbol);

    return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
      .then((res) => res.json())
      .then((res) => {
        if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
          throw new Error("Invalid candles response");
        }
        return res.map(parseOracleCandle_bsc);
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        throw e;
      });
  }

  // async fetchOracleCandles_pio(symbol: string, interval: string, limit: number): Promise<FromNewToOldArray<Bar>> {
  //   symbol = getNormalizedTokenSymbol(symbol);

  //   return fetch(buildUrl(this.url!, "", { symbol: symbol + "USDT", interval, limit }))
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (!Array.isArray(res) || (res.length === 0 && limit > 0)) {
  //         throw new Error("Invalid candles response");
  //       }
  //       // console.log("res=========>", res.map(parseOracleCandle_bsc));
  //       return res.map(parseOracleCandle_pio);
  //     })
  //     .catch((e) => {
  //       // eslint-disable-next-line no-console
  //       console.error(e);
  //       this.switchOracleKeeper();
  //       throw e;
  //     });
  // }

  async fetchIncentivesRewards(): Promise<RawIncentivesStats | null> {
    return fetch(
      buildUrl(this.url!, "/incentives", {
        ignoreStartDate: this.forceIncentivesActive ? "1" : undefined,
      })
    )
      .then((res) => res.json())
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e);
        this.switchOracleKeeper();
        return null;
      });
  }
}
