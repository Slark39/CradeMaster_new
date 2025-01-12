import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import { useTranslation } from "react-i18next";

// Image URLs
const tokenImages = {
  BTC: "/assets/images/bitcoin.webp",
  AVAX: "/assets/images/avalanche.webp",
  BNB: "/assets/images/bnb.webp",
  ADA: "/assets/images/cardano.webp",
  DOGE: "/assets/images/dogecoin.webp",
  ETH: "/assets/images/ethereum.webp",
  SHIB: "/assets/images/shiba.webp",
  SOL: "/assets/images/solana.webp",
  STETH: "/assets/images/steth_logo.webp",
  USDT: "/assets/images/Tether.webp",
  TRX: "/assets/images/tron-logo.webp",
  USDC: "/assets/images/usdc.webp",
};

function getRandomLabel(): string {
  return Math.random() < 0.5 ? "buy" : "sell";
}

// Function to update a single token's labels at random intervals
const updateSingleTokenLabels = (index: number, setPairs: React.Dispatch<React.SetStateAction<string[][][]>>) => {
  setPairs((prevPairs) => {
    const updatedPairs = [...prevPairs];
    updatedPairs[index] = [
      [getRandomLabel(), getRandomLabel(), getRandomLabel()], // Update all time intervals for the token
    ];
    return updatedPairs;
  });

  // Set a random interval for the next update of this token
  const randomInterval = Math.floor(Math.random() * (7000 - 1000 + 1)) + 1000; // Random interval between 1000ms and 10000ms
  setTimeout(() => updateSingleTokenLabels(index, setPairs), randomInterval);
};

export default function SignalTable() {
  const { t } = useTranslation();
  const [pairs, setPairs] = useState<string[][][]>([]); // 3D array to store pairs for different time intervals

  useEffect(() => {
    const numberOfPairs = 12; // Number of pairs (can be randomized if needed)
    const initialPairs = Array(numberOfPairs).fill([
      ["buy", "sell"], // 5m
      ["buy", "sell"], // 15m
      ["buy", "sell"], // 45m
    ]); // Initialize the pairs with 3 time intervals (5m, 15m, 45m)

    setPairs(initialPairs);

    // Start updating labels per token
    initialPairs.forEach((_, index) => {
      updateSingleTokenLabels(index, setPairs);
    });
  }, []);

  const tokenData = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "AVAX", name: "Avalanche" },
    { symbol: "BNB", name: "BNB" },
    { symbol: "ADA", name: "Cardano" },
    { symbol: "DOGE", name: "Dogecoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SHIB", name: "Shiba Inu" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "STETH", name: "Lido" },
    { symbol: "USDT", name: "Tether" },
    { symbol: "TRX", name: "TRON" },
    { symbol: "USDC", name: "USDC" },
  ];

  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.flexible}>
        <div className={Styles.inlineBlock}>
          <div className={Styles.overFlowHidden}>
            <table className={Styles.tableStyle}>
              <thead className={Styles.thead}>
                <tr>
                  <th scope="col" className={Styles.th}>
                    <p className="max-lg:text-[15px] lg:text-[25px]">{t("SIGNAL")}</p>
                  </th>
                  <th scope="col" className={Styles.th}>
                    5m
                  </th>
                  <th scope="col" className={Styles.th}>
                    15m
                  </th>
                  <th scope="col" className={Styles.th}>
                    45m
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokenData.map((token, index) => (
                  <tr key={index} className={Styles.tr}>
                    <td className={Styles.td1}>
                      <img src={tokenImages[token.symbol]} width={20} height={20} alt="token image" />
                      <span className="ml-3 mr-3 text-white">{token.symbol}</span>
                      <span className="text-fivthColor">{token.name}</span>
                    </td>
                    {pairs[index] ? (
                      <>
                        {/* Display the labels for 5m, 15m, and 45m */}
                        {pairs[index].map((pair, i) => (
                          <React.Fragment key={i}>
                            <td className={Styles.td3}>
                              <p className={pair[0] === "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pair[0]}</p>
                            </td>
                            <td className={Styles.td3}>
                              <p className={pair[1] === "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pair[1]}</p>
                            </td>
                            <td className={Styles.td3}>
                              <p className={pair[2] === "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pair[2]}</p>
                            </td>
                          </React.Fragment>
                        ))}
                      </>
                    ) : (
                      <td colSpan={3} className={Styles.td3}>
                        Loading...
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
