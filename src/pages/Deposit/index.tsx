import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import { FaRegClipboard, FaCheck } from "react-icons/fa";

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
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}
export default function Deposit() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [note, setNote] = useState<boolean>(false);
  const [usdt, setUsdt] = useState<string>("");
  const [tron, setTron] = useState<string>("");
  const [walletAddr, setWalletAddr] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        // Parse the JSON string and update state
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setUserInfo(parsedUserInfo);
        setWalletAddr(parsedUserInfo.cm_wallet);
        setUsdt(parsedUserInfo.usdt_balance.toString());
        setTron(parsedUserInfo.tron_balance.toString());
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const handleCopyWallet = () => {
    navigator.clipboard.writeText(walletAddr || ""); // Copy the wallet address
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

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
        <div className="mb-16 mt-20 text-[18px]">
          Please initiate a USDT transfer to your designated Crademaster wallet address below.
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div>USDT balance :</div>
          <div>{usdt}</div>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <div>TRON balance :</div>
          <div>{tron}</div>
        </div>

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
            size={200}
            className="rounded-10 border-[1px] border-white p-10"
            style={{ height: "auto", maxWidth: "100%", width: "30%" }}
            value={walletAddr || "No Wallet Connected"}
            viewBox={`0 0 80  80  `}
          />
          <div className={Styles.wallet}>
            <p>Wallet Address</p>
            <div className={Styles.input}>
              <div className="relative w-full">
                <input
                  type="text"
                  disabled
                  value={walletAddr}
                  className={Styles.inputBox}
                  id="exampleFormControlInput1"
                />

                {/* Clipboard Icon */}
                <button
                  onClick={handleCopyWallet}
                  className="absolute right-6 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-yellow-300 focus:outline-none"
                  title="Copy Wallet Address"
                >
                  {copied ? "Copied!" : <FaRegClipboard size={18} />}
                </button>
              </div>
            </div>
          </div>
          <div className={Styles.btngroup}></div>
          {/* <div className={Styles.btn} onClick={handleSubmit}>
            Submit
          </div> */}
        </div>

        {/* <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Deposit Fees</div>
            <div className={Styles.content}>0.000000USDT</div>
          </div>
        </div> */}
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
