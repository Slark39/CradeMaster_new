import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
const logoURL = "/assets/images/CM_logo.avif";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function LogoComponent() {
  const { t } = useTranslation();
  const [ipAddress, setIpAddress] = useState<string | null>(null);

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
        <div className={Styles.usage}>{t("Total usage time")}: 09:03:28</div>
        <div className={Styles.closing}>"{t("Estimated return based on the closing time")}":0.2%</div>
      </div>
    </div>
  );
}
