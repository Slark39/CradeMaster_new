import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";

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
export default function Deposit() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [note, setNote] = useState<boolean>(false);
  const [walletAddr, setWalletAddr] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        // Parse the JSON string and update state
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setUserInfo(parsedUserInfo);
        setWalletAddr(parsedUserInfo.cm_wallet);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const handleSubmit = () => {
    setNote(true);
  };
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div className={Styles.title}>Deposit</div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.email}>
          <p>Select Crypto</p>
          <div className={Styles.input}>
            <select id="countries" disabled={true} className={Styles.inputBox}>
              <option value="DE">USDT</option>
            </select>
          </div>
        </div>
        <div className={Styles.email}>
          <p>Select Network</p>
          <div className={Styles.input}>
            <select id="countries" disabled className={Styles.inputBox}>
              <option value="US">TRON(TRX-20)</option>
            </select>
          </div>
        </div>
        <div className={Styles.check}>
          <QRCode
            size={100}
            className="rounded-10 border-[1px] border-white p-10"
            style={{ height: "auto", maxWidth: "100%", width: "30%" }}
            value="hey"
            viewBox={`0 0 80  80  `}
          />
          <div className={Styles.wallet}>
            <p>Wallet Address</p>
            <div className={Styles.input}>
              <input
                type="text"
                disabled
                value={walletAddr}
                className={Styles.inputBox}
                id="exampleFormControlInput1"
              />
            </div>
          </div>
          <div className={Styles.btngroup}></div>
          <div className={Styles.btn} onClick={handleSubmit}>
            Submit
          </div>
        </div>

        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Deposit Fees</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>
        </div>
        {note ? (
          <div className={Styles.note}>
            <div className={Styles.header1}>Note:</div>
            <div className={Styles.content}>Deposit may take from a few minutes to over 30 minutes.</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
