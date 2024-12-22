import React from "react";
import Styles from "./style.module.scss";
import Chart from "../Chart";
import { ARBITRUM, AVALANCHE, BSС_MAINNET } from "config/chains";

export default function ChartGroup() {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.col1}>
        <Chart chainId={BSС_MAINNET} symbol="BTC" color="#676565" linestyle={1} col="black" backCol="#676565" />
        <Chart chainId={ARBITRUM} symbol="BTC" color="#16182e" linestyle={2} col="white" backCol="#16182e" />
        {/* <Chart chainId={PIONEX} symbol="TRX" /> */}
      </div>
      <div className={Styles.col2}>
        {/* <Chart chainId={AVALANCHE} symbol="TRX" /> */}
        <Chart chainId={ARBITRUM} symbol="BTC" color="#323232" linestyle={9} col="white" backCol="#323232" />
        <Chart chainId={ARBITRUM} symbol="BTC" color="#262626" linestyle={3} col="white" backCol="#262626" />
      </div>
    </div>
  );
}
