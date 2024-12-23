import React, { useState } from "react";
import Styles from "./style.module.scss";
import Sidenav from "components/SidebarComponent";
import { TradeBox } from "components/Synthetics/TradeBox/TradeBox";
import { usePendingTxns } from "lib/usePendingTxns";

export default function Swap() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setPendingTxns] = usePendingTxns();
  return (
    <div className={Styles.wrapper}>
      <Sidenav isOpen={true} setIsOpen={setIsOpen} />
      <div className={Styles.main}>
        <TradeBox setPendingTxns={setPendingTxns} />
      </div>
    </div>
  );
}
