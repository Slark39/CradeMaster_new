import "@wagmi/connectors";

import { i18n } from "@lingui/core";
import { Trans } from "@lingui/macro";
import { I18nProvider } from "@lingui/react";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";

import "react-toastify/dist/ReactToastify.css";
import "styles/Font.css";
import "styles/Input.css";
import "styles/Shared.scss";
import "styles/recharts.css";
import "./App.scss";

import SEO from "components/Common/SEO";

import { getExplorerUrl } from "config/chains";
import { LANGUAGE_LOCALSTORAGE_KEY } from "config/localStorage";
import { GlobalStateProvider } from "context/GlobalContext/GlobalContextProvider";
import { SettingsContextProvider } from "context/SettingsContext/SettingsContextProvider";
import { SubaccountContextProvider } from "context/SubaccountContext/SubaccountContext";
import { SyntheticsEventsProvider } from "context/SyntheticsEvents";
import { WebsocketContextProvider } from "context/WebsocketContext/WebsocketContextProvider";
import { PendingTransaction } from "domain/legacy";
import { TokensFavoritesContextProvider } from "domain/synthetics/tokens/useTokensFavorites";
import { useChainId } from "lib/chains";
import { helperToast } from "lib/helperToast";
import { defaultLocale, dynamicActivate } from "lib/i18n";
import { RainbowKitProviderWrapper } from "lib/wallets/WalletProvider";
import { useEthersSigner } from "lib/wallets/useEthersSigner";
import { SWRConfigProp } from "./swrConfig";

import ExternalLink from "components/ExternalLink/ExternalLink";
import { sendPendingOrderTxnErrorMetric } from "lib/metrics";
import { AppRoutes } from "./AppRoutes";
import { TokensBalancesContextProvider } from "context/TokensBalancesContext/TokensBalancesContextProvider";
import { sendUserAnalyticsOrderResultEvent } from "lib/userAnalytics";

// @ts-ignore
if (window?.ethereum?.autoRefreshOnNetworkChange) {
  // @ts-ignore
  window.ethereum.autoRefreshOnNetworkChange = false;
}

function App() {
  const signer = useEthersSigner();
  const { chainId } = useChainId();

  const [pendingTxns, setPendingTxns] = useState<PendingTransaction[]>([]);

  useEffect(() => {
    const checkPendingTxns = async () => {
      if (!signer) {
        return;
      }

      const updatedPendingTxns: any[] = [];
      for (let i = 0; i < pendingTxns.length; i++) {
        const pendingTxn = pendingTxns[i];
        const receipt = await signer.provider.getTransactionReceipt(pendingTxn.hash);
        if (receipt) {
          if (receipt.status === 0) {
            const txUrl = getExplorerUrl(chainId) + "tx/" + pendingTxn.hash;
            helperToast.error(
              <div>
                <Trans>
                  Txn failed. <ExternalLink href={txUrl}>View</ExternalLink>
                </Trans>
                <br />
              </div>
            );

            if (pendingTxn.metricId) {
              sendPendingOrderTxnErrorMetric(pendingTxn.metricId);
              sendUserAnalyticsOrderResultEvent(chainId, pendingTxn.metricId, false);
            }
          }

          if (receipt.status === 1 && pendingTxn.message) {
            const txUrl = getExplorerUrl(chainId) + "tx/" + pendingTxn.hash;
            helperToast.success(
              <div>
                <div className="px-10 py-8">
                  {pendingTxn.message}{" "}
                  <ExternalLink href={txUrl}>
                    <Trans>View</Trans>
                  </ExternalLink>
                </div>
                {pendingTxn.messageDetails && (
                  <div className="border-t-[1.5px] border-[#0f463d] px-10 py-8">{pendingTxn.messageDetails}</div>
                )}
              </div>,
              {
                className: "OrdersStatusNotificiation",
              }
            );
          }
          continue;
        }
        updatedPendingTxns.push(pendingTxn);
      }

      if (updatedPendingTxns.length !== pendingTxns.length) {
        setPendingTxns(updatedPendingTxns);
      }
    };

    const interval = setInterval(() => {
      checkPendingTxns();
    }, 2 * 1000);
    return () => clearInterval(interval);
  }, [signer, pendingTxns, chainId]);

  useEffect(() => {
    const defaultLanguage = localStorage.getItem(LANGUAGE_LOCALSTORAGE_KEY) || defaultLocale;
    dynamicActivate(defaultLanguage);
  }, []);

  let app = <AppRoutes />;
  app = <TokensFavoritesContextProvider>{app}</TokensFavoritesContextProvider>;
  app = <SyntheticsEventsProvider>{app}</SyntheticsEventsProvider>;
  app = <SubaccountContextProvider>{app}</SubaccountContextProvider>;
  app = <TokensBalancesContextProvider>{app}</TokensBalancesContextProvider>;
  app = <WebsocketContextProvider>{app}</WebsocketContextProvider>;
  app = <SEO>{app}</SEO>;
  app = <RainbowKitProviderWrapper>{app}</RainbowKitProviderWrapper>;
  app = <I18nProvider i18n={i18n as any}>{app}</I18nProvider>;
  app = <SettingsContextProvider>{app}</SettingsContextProvider>;
  app = (
    <SWRConfig key={chainId} value={SWRConfigProp}>
      {app}
    </SWRConfig>
  );
  app = (
    <GlobalStateProvider pendingTxns={pendingTxns} setPendingTxns={setPendingTxns}>
      {app}
    </GlobalStateProvider>
  );
  // app = <Router>{app}</Router>;

  return app;
}

export default App;
