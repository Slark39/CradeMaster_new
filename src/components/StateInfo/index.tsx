import React, { ReactNode, useEffect, useState } from "react";
import Styles from "./style.module.scss";
import { Listbox } from "@headlessui/react";
import langList from "../../assets/langList.json";
import { Link, Redirect } from "react-router-dom";
import { useLang } from "store/useLang";
import { useTranslation } from "react-i18next";
import i18n from "utils/multiLang";
import Sidenav from "components/SidebarComponent";
import { FaCheck } from "react-icons/fa";
import { useAuthStore } from "store/useAuthStore";
import axios from "axios";
import { removeAuthToken } from "utils/authUtil";
import { toast, ToastContainer } from "react-toastify";
import { calculateRemainingTime } from "utils/utilize";
type Props = {
  signal: boolean;
  setSignal: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ReferredUser {
  email: string;
  created: string; // Assuming the date string is in ISO 8601 format (e.g., "2025-01-09T15:40:04.980170Z")
  earning: number; // Assuming earning is a number, can be floating point
}

// Interface for the main user info
interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  activation: {
    percent: number;
    duration: number;
  };
  is_active_for_while: boolean;
  total_usage: number;
  elapsed: number;
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}

export default function StateInfo({ signal, setSignal }: Props) {
  const storedToken = localStorage.getItem("authToken");
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        const remaintime = calculateRemainingTime(parsedUserInfo.activation.duration, parsedUserInfo.elapsed);
        setTimeRemaining(remaintime);
        setUserInfo(parsedUserInfo);
        if (!parsedUserInfo.is_active_for_while) setSignal(true);

        const fetchUserDetails = async () => {
          try {
            const response = await axios.get(
              "https://api.crademaster.com/api/user-details/",

              {
                headers: {
                  Authorization: `Bearer ${storedToken}`, // Add Bearer token to Authorization header
                },
              }
            );

            if (response.status === 200) {
              // Successfully received additional user details
              console.log("additional data=====>", response.data);
            } else {
              console.error("Failed to fetch user details.");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
            removeAuthToken();
            window.location.href = "/login";
            toast.error("Error fetching user details.");
          }
        };
        fetchUserDetails();
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const [timeRemaining, setTimeRemaining] = useState(3600); // Start from 3600 seconds (1 hour)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { lang, setLang } = useLang();
  const [selectedLang, setSelectedLang] = useState(langList[0]);
  const { t } = useTranslation();

  // const [signal, setsignal] = useState<boolean>(false);
  useEffect(() => {
    switch (lang) {
      case "en":
        i18n.changeLanguage("en");
        break;
      case "cn":
        i18n.changeLanguage("cn");
        break;
      case "rn":
        i18n.changeLanguage("ru");
        break;
      default:
        i18n.changeLanguage("kn");
    }
  }, [lang]);

  useEffect(() => {
    // Set up an interval that runs every second
    let intervalId: NodeJS.Timeout;
    if (signal) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            console.log("previous Time====>", prevTime);
            clearInterval(intervalId);
            setSignal(false);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [signal]);

  const handleActivate = async () => {
    if (!signal) {
      const url = "https://api.crademaster.com/api/activate/";
      console.log("accesstoken", storedToken);
      const token = storedToken; // Replace with your actual Bearer token

      // Make a POST request with Bearer token
      await axios
        .post(
          url,
          {
            // Add the request body (data you want to send)
            data: {},
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add Bearer token to Authorization header
            },
          }
        )
        .then((response) => {
          if (storedToken && userInfo?.is_active_for_while) setSignal(true);
          else window.location.href = "/login";
          // Handle the response from the server
          console.log("Response:", response.data);
        })
        .catch((error) => {
          // Handle error if request fails
          console.error("Error:", error.response.data);
          if (error.response.data.code == "token_not_valid") {
            removeAuthToken();
            window.location.href = "/login";
          }
          if (error.response.data.non_field_errors) {
            setSignal(false);
            toast.warning(error.response.data.non_field_errors[0], {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
    }
  };

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={Styles.wrapper}>
      <ToastContainer />
      {storedToken ? <Sidenav isOpen={isOpen} setIsOpen={setIsOpen} /> : <></>}
      <div className={Styles.multilang}>
        <Listbox value={selectedLang} onChange={setSelectedLang}>
          <Listbox.Button className={Styles.button}>
            <div className="flex w-full flex-row items-end justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-30"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>
              {langList.find((item) => item.symbol === lang)?.name ?? "English" + ` >`}
            </div>
          </Listbox.Button>
          <Listbox.Options className={Styles.options}>
            {langList.map((item) => (
              <Listbox.Option className={Styles.liwrapper} key={item.id} value={item} disabled={item.unavailable}>
                <div
                  className={Styles.item}
                  onClick={() => {
                    localStorage.setItem("lang", item.symbol);
                    setLang(item.symbol);
                  }}
                >
                  <p>{item.name}</p>
                  {lang === item.symbol && <FaCheck className={Styles.icon} />}
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <div className={signal ? Styles.time1 : Styles.time}>{formattedTime}</div>

      <div
        className={signal ? Styles.btn1 : Styles.btn2}
        onClick={() => {
          handleActivate();
          // setIsCounting(true);
        }}
      >
        {signal ? t("ON") : t("OFF")}
      </div>
      <span className={Styles.btn2} onClick={() => (storedToken ? setIsOpen(true) : (window.location.href = "/login"))}>
        MY
      </span>
    </div>
  );
}
