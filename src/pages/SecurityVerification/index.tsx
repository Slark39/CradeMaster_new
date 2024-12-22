import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import Stepper from "components/Stepper";
import Sidenav from "components/SidebarComponent";

export default function SecurityVerification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.main}>
        <div className={Styles.header}>
          <div className={Styles.title}>Security Verification</div>
          <div className={Styles.exit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          </div>
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
