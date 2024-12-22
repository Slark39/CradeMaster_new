import React from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

export default function BalanceTable() {
  const { t } = useTranslation();
  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-primaryColor">{t("Balance (USDT)")}</p>
        </div>
        <div className={Styles.content}>1,302,507</div>
      </div>

      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Order available")}</p>
        </div>
        <div className={Styles.content}>1,245,135</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Entry amount")}</p>
        </div>
        <div className={Styles.content}>57,372</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Evaluation amount")}</p>
        </div>
        <div className={Styles.content}>68,331</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("profit and loss")}</p>
        </div>
        <div className={Styles.content}>
          <p className="text-secondaryColor">10.059</p>
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("ROI")}</p>
        </div>
        <div className={Styles.content}>
          <p className="text-secondaryColor">10.19</p>
        </div>
      </div>
    </div>
  );
}
