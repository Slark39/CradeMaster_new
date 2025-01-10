import React, { useEffect, useRef, useState } from "react";
import Styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { removeAuthToken, removeUserInfo, setAuthToken } from "utils/authUtil";
const logoURL = "/assets/images/CM_logo.avif";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidenav = ({ isOpen, setIsOpen }: Props) => {
  const { t } = useTranslation();
  // State to control the width of the sidenav
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to open the sidenav
  const sidebarRef = useRef<HTMLDivElement>(null);
  const openNav = (): void => {
    setIsOpen(true);
  };

  // Function to close the sidenav
  const closeNav = (): void => {
    setIsOpen(false);
  };

  const handleLogout = (): void => {
    removeAuthToken();
    removeUserInfo();
    window.location.href = "/login";
  };

  // Close the sidebar if clicked outside of it
  useEffect(() => {
    // Function to handle clicks outside of the sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeNav();
      }
    };

    // Add event listener for clicks on the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Side Navigation */}
      <div id="mySidenav" ref={sidebarRef} className={isOpen ? Styles.sidenav : Styles.sidenav1}>
        <Link to="/trade">
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
        </Link>
        <div className={Styles.acc}>
          <div className={Styles.icon}>
            <Link to="/trade">
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
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </Link>
          </div>
          <div className={Styles.title}>
            <Link to="/trade">{t("Home")}</Link>
          </div>
        </div>
        <div className={Styles.acc}>
          <div className={Styles.icon}>
            <Link to="/userinfo" className="flex w-full items-center justify-center">
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </Link>
          </div>
          <div className={Styles.title}>
            <Link to="/userinfo">{t("My Account")}</Link>
          </div>
        </div>
        <div className={Styles.acc}>
          <div className={Styles.icon}>
            <Link to="/deposit">
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
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </Link>
          </div>
          <div className={Styles.title}>
            <Link to="/deposit">{t("Deposit")}</Link>
          </div>
        </div>
        <div className={Styles.acc}>
          <div className={Styles.icon}>
            <Link to="/withdraw">
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </Link>
          </div>
          <div className={Styles.title}>
            <Link to="/withdraw">{t("Withdraw")}</Link>
          </div>
        </div>
        {/* <div className={Styles.acc}>
          <div className={Styles.icon}>
            <div>
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
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </div>
          </div>
          <div className={Styles.title}>
            <div>{t("Swap")}</div>
          </div>
        </div> */}
        <div className={Styles.acc}>
          <div className={Styles.icon}>
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
          <div className={Styles.title}>
            <button
              onClick={(e) => {
                window.open("https://t.me/brisen_li", "_blank");
              }}
            >
              {t("Contact")}
            </button>
          </div>
        </div>

        <div className={Styles.acc}>
          <div className={Styles.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>
          </div>
          <div className={Styles.title}>
            <button onClick={handleLogout}>{t("Logout")}</button>
          </div>
        </div>
      </div>

      {/* Content */}
    </div>
  );
};

export default Sidenav;
