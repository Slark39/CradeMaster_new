import { FC, useState } from "react";
import { Layout } from "../components/Layout";
import Styles from "./style.module.scss";
import LogoComponent from "../components/LogoComponent";
import BalanceTable from "../components/BalanceTable";
import AiTable from "../components/AiTable";
import SignalTable from "../components/SignalTable";
import StateInfo from "../components/StateInfo";
import ChartGroup from "../components/ChartGroup";
import StatusTable from "../components/StatusTable";

export const IndexPage: FC = () => {
  const [signal, setSignal] = useState(false);
  return null;
};
