import { css } from "uebersicht";
import { KRAKEN_PAIRS } from "./constants.js";

/**
 * Price widget
 */

const flexColumn = css`
  display: flex;
  flex-direction: column;
  color: white;
`;

const priceDisplay = css`
  color: white;
  font-weight: lighter;
  margin: unset;
  font-size: 3em;
`;

const pairDisplay = css`
  text-align: right;
  color: #ffffff99;
  font-weight: 400;
  margin: 0;
  font-size: 0.5em;
`;

export const Price = ({ price, pair }) => {
  return (
    <div className={flexColumn}>
      <h1 className={priceDisplay}>
        {typeof price == "number" ? price : "--"}
      </h1>
      <h2 className={pairDisplay}>{pairToPrettyDisplay[pair] || pair}</h2>
    </div>
  );
};

const pairToPrettyDisplay = {
  [KRAKEN_PAIRS.XXBTZUSD]: "BTCUSD",
  [KRAKEN_PAIRS.XXBTZCAD]: "BTCCAD",
  [KRAKEN_PAIRS.XXBTZGBP]: "BTCGBP",
  [KRAKEN_PAIRS.XXBTZEUR]: "BTCEUR",
  [KRAKEN_PAIRS.XXBTZJPY]: "BTCJPY",
};
