import React, { useState, useEffect } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { useTimeState } from "store/useTimeState";
import { useEvaluationAmount } from "store/useEvaluationAmount";

// Define the structure for a row of data
interface TableRow {
  status: string;
  exchange: string;
  level: number;
  leverage: number;
  mode: string;
  quantity: number;
  roi: number;
  profitAndLoss: number;
  margin: number;
  currentPrice: number;
  averagePrice: number;
  evaluationAmount: number;
}

export default function StatusTable() {
  const { t } = useTranslation();
  const [rows, setRows] = useState<TableRow[]>([]);
  const { time } = useTimeState();
  const { setEvaluation } = useEvaluationAmount();
  const [totalProfitAndLoss, setTotalProfitAndLoss] = useState<number>(0);

  // Helper function to generate random values within a range
  const getRandomValue = (min: number, max: number, decimals: number = 4) =>
    parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

  // Function to generate a new random row
  const generateRandomRow = (): TableRow => ({
    status: new Date().toLocaleTimeString(),
    exchange: ["OKX", "Binance", "Pionex"][Math.floor(Math.random() * 3)],
    level: 1,
    leverage: 5,
    mode: "Fixed",
    quantity: getRandomValue(0.002, 0.7),
    roi: getRandomValue(-2, 4),
    profitAndLoss: getRandomValue(0.1, 1),
    margin: getRandomValue(2, 30),
    currentPrice: getRandomValue(20, 7000),
    averagePrice: getRandomValue(20, 7000),
    evaluationAmount: getRandomValue(2, 28),
  });

  // Effect to add a new row every 5-20 seconds
  useEffect(() => {
    const addRowInterval = setInterval(
      () => {
        setRows((prevRows) => [...prevRows, generateRandomRow()]);
      },
      getRandomValue(2000, 20000, 0)
    ); // Random interval between 5-20 seconds

    return () => clearInterval(addRowInterval);
  }, []);

  useEffect(() => {
    if (time) {
      rows.map((row) => {
        if (row.roi < 0) row.profitAndLoss = -1 * row.profitAndLoss;
      });
      const total = rows.reduce((sum, row) => sum + row.profitAndLoss, 0);
      setEvaluation(parseFloat(total.toFixed(4)));
      setTotalProfitAndLoss(parseFloat(total.toFixed(4))); // Rounded to 4 decimals
    }
  }, [rows]);

  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.flexible}>
        <div className={Styles.inlineBlock}>
          <div className={Styles.overFlowHidden}>
            <table className={Styles.tableStyle}>
              <thead className={Styles.thead}>
                <tr>
                  <th>{t("status")}</th>
                  <th>{t("Exchange")}</th>
                  <th>{t("Level")}</th>
                  <th>{t("Leverage")}</th>
                  <th>M.mode</th>
                  <th>{t("Quantity")}</th>
                  <th>ROI</th>
                  <th>{t("profit and loss")}</th>
                  <th>{t("Margin")}</th>
                  <th>{t("Current Price")}</th>
                  <th>{t("Average Price")}</th>
                  <th>{t("Evaluation amount")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) =>
                  time ? (
                    <tr key={index} className={Styles.tr}>
                      <td>{time}</td>
                      <td>{row.exchange}</td>
                      <td>{row.level}</td>
                      <td>{row.leverage}</td>
                      <td>{row.mode}</td>
                      <td>{row.quantity}</td>
                      <td style={{ color: row.roi >= 0 ? "blue" : "red" }}>{row.roi}%</td>
                      <td style={{ color: row.roi >= 0 ? "blue" : "red" }}>{row.profitAndLoss}</td>
                      <td>{row.margin}</td>
                      <td>{row.currentPrice}</td>
                      <td>{row.averagePrice}</td>
                      <td>{row.evaluationAmount}</td>
                    </tr>
                  ) : (
                    <tr key={0} className={Styles.tr}>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
