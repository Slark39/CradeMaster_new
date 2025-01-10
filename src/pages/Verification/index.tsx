import React from "react";
import Styles from "./style.module.scss";
const logoURL = "/assets/images/CM_logo.avif";

export default function Verification() {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.layout}>
        <div className={Styles.header}>
          <div className={Styles.title}>
            <div className={Styles.log}>
              <div className={Styles.logo}>
                <img src={logoURL} className={Styles.logoImage} alt="token image" />
              </div>
              <div className={Styles.text}>
                <div className={Styles.subText1}>
                  <span className="text-[#ffc000]">C</span>rade
                  <span className="text-[#008ad1]">M</span>aster
                </div>
                <div className={Styles.subText2}>AI-Auto Trading System</div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
}
