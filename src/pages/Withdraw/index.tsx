import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import Slider from "rc-slider";

export default function Withdraw() {
  const [value, setValue] = useState<number>(50);
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
              onChange={(e) => setValue(e.target.valueAsNumber)}
              id="exampleFormControlInput1"
            />
          </div>
        </div>
        <div className={Styles.stepper}>
          <Slider range min={0} max={100} value={value} onChange={(number) => handleChange(number)} />
        </div>
        <a href="/#/confirmorder" className={Styles.btn}>
          Submit
        </a>
        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Minimum Deposit Limit</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Deposit Feess</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
        </div>
      </div>
    </div>
  );
}
