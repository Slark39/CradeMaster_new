import { useMemo } from "react";
import { useSettings } from "context/SettingsContext/SettingsContextProvider";
import { useLocalStorageSerializeKey } from "lib/localStorage";
import { OracleFetcher, OracleKeeperFetcher_1 } from "lib/oracleKeeperFetcher";

export function useOracleKeeperFetcher_1(chainId: number): OracleFetcher {
  const { oracleKeeperInstancesConfig, setOracleKeeperInstancesConfig } = useSettings();
  const oracleKeeperIndex = oracleKeeperInstancesConfig[chainId];
  const [forceIncentivesActive] = useLocalStorageSerializeKey([chainId, "forceIncentivesActive"], false);

  return useMemo(() => {
    const instance = new OracleKeeperFetcher_1({
      chainId,
      oracleKeeperIndex,
      forceIncentivesActive: Boolean(forceIncentivesActive),
      setOracleKeeperInstancesConfig,
    });

    return instance;
  }, [chainId, forceIncentivesActive, oracleKeeperIndex, setOracleKeeperInstancesConfig]);
}
