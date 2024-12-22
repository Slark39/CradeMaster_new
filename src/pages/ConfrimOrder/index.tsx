import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";

export default function ConfirmOrder() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div className={Styles.title}>Confirm Order</div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.get}>
          <div className={Styles.will}>You will get:</div>
          <div className={Styles.xrp}>
            <span className="mr-8 text-[35px]">85.020875</span>XRP
          </div>
        </div>
        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Address</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Network</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Tag</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>

          <div className={Styles.limit}>
            <div className={Styles.title}>Label</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Coin</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Amount</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Network fee</div>
            <div className={Styles.content}>0.000000BTC</div>
          </div>
        </div>
        <div className={Styles.description}>
          Ensure that the address is correct and on the same network. Transactions cannot be cancelled
        </div>
        <a href="/#/scamrisk" className={Styles.btn}>
          Confirm
        </a>
      </div>
    </div>
  );
}
