import React, { useState } from "react";
// import Link from "next/link";
import Styles from "./style.module.scss";
import { Link } from "react-router-dom";
import Sidenav from "components/SidebarComponent";

export default function EmailVerification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div className={Styles.title}>Email Verification</div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.description}>
          Please enter the 6-digit verification code that was sent to alicent@gmail.com
        </div>
        <div className={Styles.email}>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
          <div className={Styles.input}>
            <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
          </div>
        </div>

        <a className={Styles.btn}>Submit</a>
      </div>
    </div>
  );
}
