import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import { FaArrowLeft } from "react-icons/fa";

export default function ConfirmOrder() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const getAmount = localStorage.getItem("withdraw");
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div>
          <button
            onClick={(e) => (window.location.href = "/withdraw")}
            className="rounded-md flex items-center gap-2 bg-none px-4 py-2 text-white  focus:outline-none"
          >
            <FaArrowLeft size={26} />
          </button>
        </div>
        <div className={Styles.title}>Confirm Order</div>
        <div></div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.get}>
          <div className={Styles.will}>You will get:</div>
          <div className={Styles.xrp}>
            <span className="mr-8 text-[35px]">{getAmount}</span>USDT
          </div>
        </div>
        <div className={Styles.state}>
          <div className={Styles.limit}>
            <div className={Styles.title}>Address</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Network</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Tag</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Label</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Coin</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Amount</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
          <div className={Styles.limit}>
            <div className={Styles.title}>Network fee</div>
            <div className={Styles.content}>0.000000 USDT</div>
          </div>
        </div>
        <div className={Styles.description}>
          Ensure that the address is correct and on the same network. Transactions cannot be cancelled
        </div>
        <a href="/scamrisk" className={Styles.btn}>
          Confirm
        </a>
      </div>
    </div>
  );
}
