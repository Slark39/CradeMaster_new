import React, { useState } from "react";
// import Link from "next/link";
import { Link } from "react-router-dom";
import Styles from "./style.module.scss";
import Sidenav from "components/SidebarComponent";
import { FaArrowLeft } from "react-icons/fa";

export default function ScamRisk() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.header}>
        <div>
          {" "}
          <button
            onClick={(e) => (window.location.href = "/withdraw")}
            className="rounded-md flex items-center gap-2 bg-none px-4 py-2 text-white  focus:outline-none"
          >
            <FaArrowLeft size={26} />
          </button>
        </div>
        <div className={Styles.title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div></div>
      </div>
      <div className={Styles.main}>
        <div className={Styles.description}>Scam Risk Warning</div>
        <div className={Styles.txt}>
          Recently,<span className="text-secondaryColor">online scams</span> have become more serious. Scammers may use
          high returns as bait to attract you to transfer assets to their fraudulent addresses/
          <span className="text-secondaryColor">fake trading platform</span>. In order to gain your trust, you may
          withdraw successfully with <span className="text-secondaryColor">a small amount</span>. Once you transfer a
          large sum of funds, you may find yourself unable to withdraw anymore. Under the pretext of{" "}
          <span className="text-secondaryColor">taxes/audit fees/Anti-Money Laundering</span>
          regulations, etc..., scammers would ask you to transfer more funds to them. If you encounter the above
          situation, please terminate all transcations.
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
            I fully understand the potential risks associated with asset withdrawal, and confirm that I would like to
            continue withdrawing my assets
          </div>
        </div>
        <div className={Styles.btngroup}>
          <div className={Styles.btn}>Cancel</div>
          <div className={Styles.btn1}>Confirm</div>
        </div>
      </div>
      <div className={Styles.footer}>
        Don't have an account?
        <span className="text-blue-700">
          <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}
