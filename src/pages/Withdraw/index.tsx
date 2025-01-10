import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import Slider from "rc-slider";

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

export default function Withdraw() {
  const [walletAddr, setWalletAddr] = useState<string>("");
  const [walletamount, setWalletAmount] = useState<number>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        // Parse the JSON string and update state
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setUserInfo(parsedUserInfo);
        setWalletAddr(parsedUserInfo.cm_wallet);
        setWalletAmount(parsedUserInfo.usdt_balance);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);
  const [value, setValue] = useState<number>(17000);
  const handleSubmit = () => {
    localStorage.setItem("withdraw", value.toString());
  };
  const handleChange = (number: number) => {
    setValue(number); // convert the value to a number
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div className={Styles.title}>Withdraw</div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.email}>
          <p>Select Crypto</p>
          <div className={Styles.input}>
            <select id="countries" disabled className={Styles.inputBox}>
              <option value="DE">USDT</option>
            </select>
          </div>
        </div>
        <div className={Styles.email}>
          <p>Select Network</p>
          <div className={Styles.input}>
            <select id="countries" disabled className={Styles.inputBox}>
              <option value="DE">TRON(TRX-20)</option>
            </select>
          </div>
        </div>
        <div className={Styles.email}>
          <p>Wallet Address</p>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>
        <div className={Styles.email}>
          <p>Wallet Amount</p>
          <div className={Styles.input}>
            <input
              type="number"
              className={Styles.inputBox}
              value={value}
              defaultValue={walletamount}
              onChange={(e) => setValue(e.target.valueAsNumber)}
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div className={Styles.stepper}>
          <Slider
            range
            min={0}
            max={walletamount}
            defaultValue={walletamount}
            value={value}
            onChange={(number) => handleChange(number)}
          />
        </div>
        <a href="/confirmorder" className={Styles.btn} onClick={handleSubmit}>
          Submit
        </a>
        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>

          <div className={Styles.limit}>
            <div className={Styles.title}>Deposit Feess</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
