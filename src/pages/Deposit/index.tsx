import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";

export default function Deposit() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
              <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
            </div>
          </div>
          <div className={Styles.btngroup}></div>
          <div className={Styles.btn}>Submit</div>
        </div>

        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Deposit Feess</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
        </div>
        <div className={Styles.note}>
          <div className={Styles.header1}>Note:</div>
          <div className={Styles.content}>Deposit may take from a few minutes to over 30 minutes.</div>
        </div>
      </div>
    </div>
  );
}
