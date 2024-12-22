import React, { useEffect, useState } from "react";
import Styles from "./style.module.scss";
import { Label } from "recharts";
import { useTranslation } from "react-i18next";

const BTC_URL = "/assets/images/bitcoin.webp";
const avalanche_URL = "/assets/images/avalanche.webp";
const bnb_URL = "/assets/images/bnb.webp";
const cardano_URL = "/assets/images/cardano.webp";
const dogecoin_URL = "/assets/images/dogecoin.webp";
const ethereum_URL = "/assets/images/ethereum.webp";
const shiba_URL = "/assets/images/shiba.webp";
const solana_URL = "/assets/images/solana.webp";
const steth_logo_URL = "/assets/images/steth_logo.webp";
const Tether_URL = "/assets/images/Tether.webp";
const tron_logo_URL = "/assets/images/tron-logo.webp";
const usdc_URL = "/assets/images/usdc.webp";

function getRandomLabel(): string {
  return Math.random() < 0.5 ? "buy" : "sell";
}

function getRandomInterval(): number {
  return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000; // Random time between 2000ms and 3000ms
}

// Function to get a random number of pairs (either 2 or 3)
// function getRandomNumberOfPairs(): number {
//   return Math.random() < 0.5 ? 2 : 3; // 50% chance to have 2 pairs or 3 pairs
// }

function getRandomNumberOfPairs(): number {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const randomIndex = Math.floor(Math.random() * numbers.length); // Get a random index from the array
  return numbers[randomIndex]; // Return the number at the random index
}

// Example array of 12 numbers

// Choose one random number from the array

// React component
export default function SignalTable() {
  const { t } = useTranslation();
  const [pairs, setPairs] = useState<string[][]>([
    ["buy", "sell"],
    ["sell", "buy"],
    ["buy", "sell"],
    ["sell", "buy"],
    ["buy", "sell"],
    ["sell", "buy"],
    ["buy", "sell"],
    ["sell", "buy"],
    ["buy", "sell"],
    ["sell", "buy"],
    ["buy", "sell"],
    ["sell", "buy"],
  ]);

  // Function to update a specific pair of labels
  const updateLabel = (index: number) => {
    const newPairs = [...pairs];
    newPairs[index] = [getRandomLabel(), getRandomLabel()]; // Update both "buy" and "sell"
    setPairs(newPairs); // Update the state with new labels

    // Set a random interval for the next update (between 2 and 3 seconds)
    const randomInterval = getRandomInterval();
    setTimeout(() => updateLabel(index), randomInterval); // Recursively call the update function for this index
  };

  useEffect(() => {
    const numberOfPairs = getRandomNumberOfPairs(); // Decide randomly if there will be 2 or 3 pairs
    const initialPairs = Array(numberOfPairs).fill(["buy", "sell"]); // Initialize the labels for each pair

    setPairs(initialPairs); // Set the initial labels state

    // Start updating the labels for each pair
    for (let i = 0; i < numberOfPairs; i++) {
      updateLabel(i); // Initialize label updates for each pair
    }
  }, []);

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
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={BTC_URL} width={20} height={20} alt="token image" />
                    <span className="ml-3 mr-3 text-white">BTC</span>
                    <span className="text-fivthColor">Bitcoin</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[0][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[0][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[0][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[0][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[0][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[0][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={avalanche_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">AVAX</span>
                    <span className="text-fivthColor">Avalanche</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[1][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[1][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[1][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[1][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[1][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[1][0]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={bnb_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">BNB</span>
                    <span className="text-fivthColor">BNB</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[2][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[2][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[2][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[2][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[2][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[2][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={cardano_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">ADA</span>
                    <span className="text-fivthColor">Cardano</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[3][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[3][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[3][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[3][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[3][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[3][0]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={dogecoin_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">DOGE</span>
                    <span className="text-fivthColor">Dogecoin</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[4][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[4][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[4][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[4][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[4][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[4][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={ethereum_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">ETH</span>
                    <span className="text-fivthColor">Ethereum</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[5][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[5][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[5][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[5][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[5][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[5][0]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={shiba_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">SHIB</span>
                    <span className="text-fivthColor">Shiba Inu</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[6][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[6][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[6][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[6][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[6][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[6][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={solana_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">SOL</span>
                    <span className="text-fivthColor">Solana</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[7][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[7][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[7][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[7][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[7][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[7][0]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={steth_logo_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">STETH</span>
                    <span className="text-fivthColor">Lido</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[8][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[8][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[8][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[8][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[8][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[8][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={Tether_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">USDT</span>
                    <span className="text-fivthColor">Tether</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[9][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[9][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[9][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[9][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[9][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[9][0]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={tron_logo_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">TRX</span>
                    <span className="text-fivthColor">TRON</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[10][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[10][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[10][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[10][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[10][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[10][1]}</p>
                  </td>
                </tr>
                <tr className={Styles.tr}>
                  <td className={Styles.td1}>
                    <img src={usdc_URL} width={20} height={20} alt="token image" />
                    <span className="ml-1 mr-1 text-white">USDC</span>
                    <span className="text-fivthColor">USDC</span>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[11][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[11][0]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[11][1] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[11][1]}</p>
                  </td>
                  <td className={Styles.td3}>
                    <p className={pairs[11][0] == "buy" ? "text-secondaryColor" : "text-thirdColor"}>{pairs[11][0]}</p>
                  </td>
                </tr>
                {/* {holderDistributionList.map((item, index) => (
            <tr
              key={index}
              className={Styles.tr}>
              <td className={Styles.td1}></td>
              <td className={Styles.td3}>{item.percentage}</td>
            </tr>
          ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
