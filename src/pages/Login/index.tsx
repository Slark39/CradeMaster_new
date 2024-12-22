import React from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
const logoURL = "/assets/images/CM_logo.avif";

export default function Login() {
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
        <div className={Styles.main}>
          <div className={Styles.description}>Welcome to CradeMaster</div>
          <div className={Styles.email}>
            <p>Email</p>
            <div className={Styles.input}>
              <input type="text" className={Styles.inputBox} placeholder="Email" id="exampleFormControlInput1" />
            </div>
          </div>
          <div className={Styles.email}>
            <p>Password</p>
            <div className={Styles.input}>
              <input type="password" className={Styles.inputBox} placeholder="password" id="exampleFormControlInput1" />
            </div>
          </div>

          <div className={Styles.check}>
            <div className={Styles.checkBtn}>
              <input
                className=" border-secondary-500 before:shadow-checkbox checked:border-primary checked:bg-primary checked:after:-mt-px checked:focus:before:shadow-checkbox checked:focus:after:-mt-px checked:focus:after:rounded-none dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary relative float-left me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none  rounded-[0.25rem] border-[0.125rem] border-solid bg-[#1a1b1d] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-transparent before:content-[''] checked:before:opacity-[0.16] checked:after:absolute checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                type="checkbox"
                value=""
                id="checkboxDefault"
              />
            </div>
            <div className={Styles.policy}>
              By creating an account, I agree to CradeMaster's Terms of Service and Privacy Policy
            </div>
          </div>
          <div className={Styles.btn}>Login</div>
        </div>
      </div>
      <div className={Styles.footer}>
        <span className="mr-3 text-yellow-300">
          <Link to="/register">Sign up</Link>
        </span>
        or
        <span className="ml-3 text-yellow-300">
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  );
}
