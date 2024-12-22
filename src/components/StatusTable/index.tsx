import React from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

export default function StatusTable() {
  const { t } = useTranslation();
  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.flexible}>
        <div className={Styles.inlineBlock}>
          <div className={Styles.overFlowHidden}>
            <table className={Styles.tableStyle}>
              <thead className={Styles.thead}>
                <tr>
                  <th scope="col" className={Styles.th}>
                    {t("status")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Exchange")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Level")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Leverage")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    M.mode
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Quantity")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    ROI
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("profit and loss")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Margin")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Current Price")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Average Price")}
                  </th>
                  <th scope="col" className={Styles.th}>
                    {t("Evaluation amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <span className="ml-1 mr-1 text-white">BTC</span>
                    <span className="text-fivthColor">Bitcoin</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-thirdColor">Sell</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-secondaryColor">Buy</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-secondaryColor">Buy</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <span className="ml-1 mr-1 text-white">BTC</span>
                    <span className="text-fivthColor">Bitcoin</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-thirdColor">Sell</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-secondaryColor">Buy</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className="text-secondaryColor">Buy</p>
                  </td>
                </tr>

                {/* {holderDistributionList.map((item, index) => (
    <tr
      key={index}
      className={Styles.tr}>
      <td className={Styles.td1}></td>
      <td className={Styles.td3}>{item.percentage}</td>
    </tr>
  ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
