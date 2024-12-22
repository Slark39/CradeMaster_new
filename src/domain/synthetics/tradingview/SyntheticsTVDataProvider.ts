import { getChainlinkChartPricesFromGraph } from "domain/prices";
import { TVDataProvider } from "domain/tradingview/TVDataProvider";
import { Bar, FromOldToNewArray } from "domain/tradingview/types";
import { sleep } from "lib/sleep";
import { OracleFetcher } from "lib/oracleKeeperFetcher";

export class SyntheticsTVDataProvider extends TVDataProvider {
  candlesTimeout = 5000;
  oracleKeeperFetcher: OracleFetcher;
  isV2 = true;

  constructor(params: {
    resolutions: { [key: number]: string };
    oracleFetcher: OracleFetcher;
    chainId: number;
    symbol: string;
  }) {
    super(params);
    this.oracleKeeperFetcher = params.oracleFetcher;
    this.chainId = params.chainId;
    this.symbol = params.symbol;
  }

  override async getTokenChartPrice(
    chainId: number,
    ticker: string,
    period: string,
    onFallback?: (ex: Error) => void
  ): Promise<FromOldToNewArray<Bar>> {
    const limit = 5000;
    const bars: FromOldToNewArray<Bar> = await Promise.race([
      chainId == 56
        ? this.oracleKeeperFetcher.fetchOracleCandles_bsc(this.symbol, period, limit).then((bars) => {
            return bars;
          })
        : this.oracleKeeperFetcher.fetchOracleCandles(ticker, period, limit).then((bars) => {
            return bars.reverse();
          }),
      sleep(this.candlesTimeout).then(() => Promise.reject(`Oracle candles timeout`)),
    ])
      .catch((ex) => {
        // eslint-disable-next-line no-console
        console.warn(ex, "Switching to graph chainlink data");
        onFallback?.(ex);
        return Promise.race([
          getChainlinkChartPricesFromGraph(ticker, period),
          sleep(this.candlesTimeout).then(() => Promise.reject(`Chainlink candles timeout`)),
        ]);
      })
      .catch((ex) => {
        // eslint-disable-next-line no-console
        console.warn("Load history candles failed", ex);
        return [];
      });

    return bars;
  }

  override async getLimitBars(
    _chainId: number,
    ticker: string,
    period: string,
    limit: number
  ): Promise<FromOldToNewArray<Bar>> {
    if (this.chainId == 56)
      return (await this.oracleKeeperFetcher.fetchOracleCandles_bsc(this.symbol, period, limit)).reverse();
    // if (this.chainId == 13381)
    //   return (await this.oracleKeeperFetcher.fetchOracleCandles_pio(this.symbol, period, limit)).reverse();
    else return (await this.oracleKeeperFetcher.fetchOracleCandles(ticker, period, limit)).reverse();
  }
}
