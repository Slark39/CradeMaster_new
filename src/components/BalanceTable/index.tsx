import React, { useLayoutEffect, useState } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { useEvaluationAmount } from "store/useEvaluationAmount";

interface ReferredUser {
  email: string;
  created: string; // Assuming the date string is in ISO 8601 format (e.g., "2025-01-09T15:40:04.980170Z")
  earning: number; // Assuming earning is a number, can be floating point
}

// Interface for the main user info
interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  availability: {
    fee_percentage: number;
    hours: number;
  };
  is_program_active: boolean;
  total_execute: number;
  elapsed: number;
  total_balance: number;
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}

export default function BalanceTable() {
  const { t } = useTranslation();
  const { evaluation } = useEvaluationAmount();
  const [totalBalance, setTotalBalance] = useState<number>();
  const [orderAvailable, setOrderAvailable] = useState<number>();
  const [entryAmount, setEntryAmount] = useState<number>();

  useLayoutEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setTotalBalance(parsedUserInfo.total_balance);
        setOrderAvailable(parsedUserInfo.tron_balance);
        setEntryAmount(parsedUserInfo.total_balance - parsedUserInfo.tron_balance);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);
  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-primaryColor">{t("Balance (USDT)")}</p>
        </div>
        <div className={Styles.content}>{totalBalance}</div>
      </div>

      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Order available")}</p>
        </div>
        <div className={Styles.content}>{orderAvailable}</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Entry amount")}</p>
        </div>
        <div className={Styles.content}>{entryAmount}</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Evaluation amount")}</p>
        </div>
        <div className={Styles.content}>{evaluation}</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("profit and loss")}</p>
        </div>
        <div className={Styles.content}>
          <p className="text-secondaryColor">1000</p>
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
