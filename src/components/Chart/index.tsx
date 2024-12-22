import React from "react";
import { TVChart } from "components/Synthetics/TVChart/TVChart";
type Props = {
  chainId: number;
  symbol: string;
  color: string;
  linestyle: number;
  col: string;
  backCol: string;
};

export default function Chart({ chainId, symbol, color, linestyle, col, backCol }: Props) {
  return (
    <div className="rounded-lg mb-10  h-full w-full bg-black">
      <TVChart chainId={chainId} symbol={symbol} color={color} linestyle={linestyle} col={col} backCol={backCol} />
    </div>
  );
}
