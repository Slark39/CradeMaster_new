import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

type Props = {
  signal: boolean;
};

export default function AiTable({ signal }: Props) {
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState(3600); // Start from 3600 seconds (1 hour)
  useEffect(() => {
    // Set up an interval that runs every second
    let intervalId: NodeJS.Timeout;
    if (signal) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            setTimeRemaining(3600);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [signal]);
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-primaryColor">{t("MY AI")}</p>
        </div>
        <div className={Styles.content}>{formattedTime}</div>
      </div>

      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Order available")}</p>
        </div>
        <div className={Styles.content}>1,245,135</div>
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
          <p>{t("Entry amount")}</p>
        </div>
        <div className={Styles.content}>57,372</div>
      </div>
    </div>
  );
}
