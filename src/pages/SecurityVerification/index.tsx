import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import Stepper from "components/Stepper";
import Sidenav from "components/SidebarComponent";
import { useTranslation } from "react-i18next";

export default function SecurityVerification() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState("");
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.main}>
        <div className={Styles.header}>
          <div className={Styles.title}>Security Verification</div>
        </div>
        <div className={Styles.email}>
          <p>Document Number</p>
          <div className={Styles.input}>
            <input type="number" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>
        <div className={Styles.email}>
          <p>Expire Date</p>
          <div className={Styles.input}>
            <input type="date" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>
        <div className={Styles.email}>
          <div className={Styles.input}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t("Please write your name in English exactly as it is registered on Binance.")}
              className={Styles.inputBox}
              style={{
                width: "100%",
                height: "100px", // Adjust height to mimic a textarea
                padding: "10px",
                borderRadius: "8px",
                fontSize: "14px",
                resize: "none", // Prevent resizing
                whiteSpace: "pre-wrap", // Allow text wrapping
                overflowY: "auto", // Scroll when content overflows
              }}
              multiple // This attribute has no effect on input but added for clarity
            />
          </div>
        </div>
        <div className={Styles.email}>
          <p>ID Front Document</p>
          <div className={Styles.input}>
            <input type="file" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>
        <div className={Styles.email}>
          <p>ID Back Document</p>
          <div className={Styles.input}>
            <input type="file" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>
        <div className={Styles.btngroup}>
          <div className={Styles.btn}>Cancel</div>
          <div className={Styles.btn1}>Submit</div>
        </div>
      </div>
    </div>
  );
}
