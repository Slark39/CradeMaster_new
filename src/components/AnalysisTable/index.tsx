import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { formatDate_1 } from "utils/utilize";
// Interface for each execution item
export interface ExecuteItem {
  amount: number;
  profit: number;
  created: string; // ISO date string
}

export interface ExecuteItemWithAverage extends ExecuteItem {
  average: number; // Added field for the average
}

// Interface for availability details
export interface Availability {
  fee_percentage: string; // Stored as string, e.g., "5.00"
  hours: number;
}

// Main user data interface
export interface UserData {
  email: string;
  cm_wallet: string;
  referral_code: string;
  profit_percent: string; // e.g., "0.15"
  availability: Availability;
  is_program_active: boolean;
  total_execute: number; // e.g., 25040
  elapsed: number; // e.g., 17353.05251
  referred_users: string[]; // Empty array in the example
  usdt_balance: number; // e.g., 0
  tron_balance: number; // e.g., 2000
  total_balance: number; // e.g., 5000
  executes: ExecuteItem[]; // Array of execution items
}

export default function AnalysisTable() {
  const [executes, setExecutes] = useState<ExecuteItem[]>([]);

  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        const parsedUserInfo: UserData = JSON.parse(storedUserInfoString);
        setExecutes(parsedUserInfo.executes);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const totalProfit = useMemo(() => executes.reduce((sum, item) => sum + item.profit, 0), [executes]);

  const executesWithAverage: ExecuteItemWithAverage[] = useMemo(
    () =>
      executes.map((item) => ({
        ...item,
        average:
          totalProfit !== 0
            ? parseFloat((item.profit / totalProfit).toFixed(2)) // Rounded to 2 decimal places
            : 0,
      })),
    [executes, totalProfit]
  );

  const { t } = useTranslation();
  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">{t("Date")}</p>
        </div>
        <div className={Styles.content1}>{t("Percent")}</div>
        <div className={Styles.content1}>{t("Amount")}</div>
      </div>
      {executesWithAverage.map((item, index) => (
        <div key={index} className={Styles.row}>
          <div className={Styles.title}>
            <p className="text-white">{formatDate_1(item.created)}</p>
          </div>
          <div className={Styles.content}>{item.average}</div>
          <div className={Styles.content}>{item.profit}</div>
        </div>
      ))}
    </div>
  );
}
