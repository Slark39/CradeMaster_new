import React, { useState } from "react";
import Styles from "./style.module.scss";
import QRCode from "qrcode.react";
import Sidenav from "components/SidebarComponent";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";

export default function UserInfo() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpen1, setIsOpen1] = useState<boolean>(false);
  const { openConnectModal } = useConnectModal();
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.navbar}>
        <div className={Styles.user}>
          <div className={Styles.icon}>
            <img src="/assets/images/1.PNG" alt="token image" className="h-[70px] w-[70px] rounded-5" />
          </div>
          <div className={Styles.username}>
            <div className={Styles.name}>User-22052</div>
            <div className={Styles.social}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-15"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-15"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
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
            <button className="App-button-option App-card-option" onClick={openConnectModal}>
              Connect Wallet
            </button>
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
              <a href="/#/securityverification" className={Styles.btn}>
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
            <div className={Styles.title}>Trade</div>
            <div className={Styles.pending}>Pending</div>
          </div>
        </div>
      </div>
      <div className={Styles.estimated}>
        <div className={Styles.label}>Estimated Balance@</div>
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
        <div className={Styles.btc}>0.00</div>
        <div className={Styles.dolloar}>$0.00</div>
        <div className={Styles.today}>Today's PnL + $0.00(0.00%)</div>
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
                <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
              </div>
            </div>
            <div className={Styles.email}>
              <p>My Invitation Code</p>
              <div className={Styles.input}>
                <input type="text" className={Styles.inputBox} id="exampleFormControlInput1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isOpen1} onClose={() => setIsOpen1(false)}>
        <Dialog.Panel>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>This will permanently deactivate your account</Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data will be permanently removed. This action
            cannot be undone.
          </p>

          <button onClick={() => setIsOpen1(false)}>Deactivate</button>
          <button onClick={() => setIsOpen1(false)}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
