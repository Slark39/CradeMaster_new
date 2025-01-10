import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
const logoURL = "/assets/images/CM_logo.avif";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { convertHoursToString } from "utils/utilize";

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
  activation: {
    percent: number;
    duration: number;
  };
  is_active_for_while: boolean;
  total_usage: number;
  elapsed: number;
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}
export default function LogoComponent() {
  const { t } = useTranslation();
  const [totalUsage, setTotalUsage] = useState<string>("");
  const [percent, setPercent] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setTotalUsage(convertHoursToString(parsedUserInfo.total_usage));
        setPercent(parsedUserInfo.activation.percent.toString());
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch the user's IP address from ipify API
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        setIpAddress(response.data.ip); // Store the IP address
      })
      .catch((error) => {
        console.error("Error fetching IP address: ", error);
      });
  }, []);
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.log}>
        <div className={Styles.logo}>
          <img src={logoURL} className={Styles.logoImage} alt="token image" />
        </div>
        <div className={Styles.text}>
          <div className={Styles.subText1}>
            <span className="text-[#ffc000]">C</span>rade
            <span className="text-[#008ad1]">M</span>aster
          </div>
          <div className={Styles.subText2}>AI-Auto Trading System</div>
        </div>
      </div>
      <div className={Styles.state}>
        <div className={Styles.connet}>
          {t("Connection IP")}:{ipAddress ? ipAddress : "Loading..."}
        </div>
        <div className={Styles.usage}>
          {t("Total usage time")}:{totalUsage}
        </div>
        <div className={Styles.closing}>
          "{t("Estimated return based on the closing time")}":{percent}%
        </div>
      </div>
    </div>
  );
}
