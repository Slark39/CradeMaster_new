import React, { useEffect, useMemo, useState } from "react";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";
import { MarketsList } from "components/Synthetics/MarketsList/MarketsList";
import { SyntheticsStateContextProvider } from "context/SyntheticsStateContext/SyntheticsStateContextProvider";
import { useAccount } from "wagmi";

interface ReferredUser {
  email: string;
  date_joined: string; // Assuming the date string is in ISO 8601 format (e.g., "2025-01-09T15:40:04.980170Z")
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

export default function UserInfo() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [walletAddr, setWalletAddr] = useState<string>("");
  const [usdt, setUsdt] = useState<string>("");
  const [tron, setTron] = useState<string>("");
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        // Parse the JSON string and update state
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setUserInfo(parsedUserInfo);
        setUserEmail(parsedUserInfo.email);
        setWalletAddr(parsedUserInfo.cm_wallet);
        setUsdt(parsedUserInfo.usdt_balance.toString());
        setTron(parsedUserInfo.tron_balance.toString());
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const account = useAccount();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      seed: Math.random().toString(36).substring(2, 15),
      size: 128,
      // ... other options
    }).toDataUri();
  }, []);
  // const generateAvatar = () => {
  //   const options = {}; // Customize options if needed
  //   const avatars = new Avatars(Avataaars, options);

  //   const randomSeed = Math.random().toString(36).substring(2, 15); // Generate a random seed
  //   const svg = avatars.create(randomSeed); // Create an avatar SVG
  //   setAvatarSvg(svg);
  // };
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.navbar}>
        <div className={Styles.user}>
          <div className={Styles.icon}>
            <img src={avatar} alt="Avatar" className="h-[70px] w-[70px] rounded-5" />
          </div>
          <div className={Styles.username}>
            <div className={Styles.name}>{userEmail}</div>
            <div className={Styles.social}>{walletAddr}</div>
          </div>
        </div>
        <div className={Styles.uid}>
          <div className={Styles.title}>UID</div>
          <div className={Styles.id}>36226553</div>
        </div>
        <div className={Styles.vip}>
          <div className={Styles.title}>Grade</div>
          <div className={Styles.vv}>Regular User</div>
        </div>
        <div className={Styles.following}>
          <div className={Styles.title}>Following</div>
          <div className={Styles.num}>0</div>
        </div>
        <div className={Styles.followers}>
          <div className={Styles.title}>Followers</div>
          <div className={Styles.num}>0</div>
        </div>
      </div>
      <div className={Styles.stepper}>
        <div className={Styles.title}>
          <div>Get Started</div>
          <div>
            {/* <button className="App-button-option App-card-option" disabled onClick={openConnectModal}>
              {account.address ? account.address : "Connect Wallet"}
            </button> */}
          </div>
        </div>
        <div className={Styles.progress}>
          <div className={Styles.number}>
            <p className="-rotate-45">1</p>
          </div>
          <div className={Styles.bar1}></div>
          <div className={Styles.number1}>
            <p className="-rotate-45">2</p>
          </div>
          <div className={Styles.bar2}></div>
          <div className={Styles.number1}>
            <p className="-rotate-45">3</p>
          </div>
          <div className={Styles.bar3}></div>
        </div>
        <div className={Styles.content}>
          <div className={Styles.verify}>
            <div className={Styles.left}>
              <div className={Styles.title}>
                <p className="text-[15px]">Verify Account</p>
                <p className="text-[10px] text-gray-500">
                  Complete identity verification to access all Binance services
                </p>
              </div>
              <a href="/securityverification" className={Styles.btn}>
                Verify Now
              </a>
            </div>
            <div className={Styles.right}>
              <img src="/assets/images/kcc.svg" width={100} height={100} alt="token image" className="rounded-5" />
            </div>
          </div>
          <div className={Styles.deposit}>
            <div className={Styles.title}>Deposit</div>
            <div className={Styles.pending}>Pending</div>
          </div>
          <div className={Styles.trade}>
            {/* <div className={Styles.title}>Trade</div> */}
            {/* <div className={Styles.pending}>Pending</div> */}
          </div>
        </div>
      </div>
      <div className={Styles.estimated}>
        <div className={Styles.label}>Estimated Balance:</div>
        <div className={Styles.badage}>
          <div className={Styles.deposit}>
            <Link to="/deposit">Deposit</Link>
          </div>
          <div className={Styles.deposit}>
            <Link to="/withdraw">Withdraw</Link>
          </div>
        </div>
      </div>
      <div className={Styles.balance}>
        <div className={Styles.btc}>{tron} TRX</div>
        <div className={Styles.dolloar}>{usdt} USDT</div>
        {/* <div className={Styles.today}>Today's PnL + $0.00(0.00%)</div> */}
      </div>
      <div className={Styles.refferal}>
        <div className={Styles.title}>Referral</div>
        <div className={Styles.main}>
          <div className={Styles.qrcode}>
            <QRCode
              size={60}
              className=" rounded-10s"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value="hey"
              viewBox={`0 0 0 0`}
            />
          </div>
          <div className={Styles.invite}>
            <div className={Styles.email}>
              <p>Invite Link</p>
              <div className={Styles.input}>
                <input
                  type="text"
                  className={Styles.inputBox}
                  disabled
                  value={`https://crademaster.com/register?referral=${userInfo?.referral_code}`}
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
            <div className={Styles.email}>
              <p>My Invitation Code</p>
              <div className={Styles.input}>
                <input
                  type="text"
                  className={Styles.inputBox}
                  disabled
                  value={userInfo?.referral_code}
                  id="exampleFormControlInput1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <SyntheticsStateContextProvider skipLocalReferralCode={false} pageType="pools">
          <MarketsList />
        </SyntheticsStateContextProvider>
      </div>
    </div>
  );
}
