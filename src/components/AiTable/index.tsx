import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";
import { removeAuthToken } from "utils/authUtil";
import { calculateRemainingTime } from "utils/utilize";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  signal: boolean;
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
  availability: {
    percent: number;
    hours: number;
  };
  is_program_active: boolean;
  total_execute: number;
  elapsed: number;
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}
export default function AiTable({ signal }: Props) {
  const storedToken = localStorage.getItem("authToken");
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        const remaintime = calculateRemainingTime(parsedUserInfo.availability.hours, parsedUserInfo.elapsed);
        setTimeRemaining(remaintime);
        setUserInfo(parsedUserInfo);

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
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState(3600); // Start from 3600 seconds (1 hour)
  useEffect(() => {
    // Set up an interval that runs every second
    let intervalId: NodeJS.Timeout;
    if (signal) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            setTimeRemaining(3600);
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [signal]);
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  // Format time as HH:MM:SS
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-primaryColor">{t("MY AI")}</p>
        </div>
        <div className={Styles.content}>{formattedTime}</div>
      </div>

      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Order available")}</p>
        </div>
        <div className={Styles.content}>1,245,135</div>
      </div>

      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("profit and loss")}</p>
        </div>
        <div className={Styles.content}>
          <p className="text-secondaryColor">10.059</p>
        </div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p>{t("Entry amount")}</p>
        </div>
        <div className={Styles.content}>57,372</div>
      </div>
    </div>
  );
}
