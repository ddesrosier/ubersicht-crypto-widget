import { css } from "uebersicht";
import { CONFIG } from "./src/config.js";
import { Graph, paintGraph } from "./src/graph.jsx";
import { getOHLC, parseOHLCData } from "./src/network.js";
import { Price } from "./src/price.jsx";

// Übersicht defined variable
export const refreshFrequency = CONFIG.REFRESH_FREQUENCY;

export const className = `
  left: 2em;
  top: 2em;
  font-family: -apple-system;
  z-index: 2;
  padding: 1em;
`;

/**
 * Übersicht defined
 * Command to execute on refresh cycle
 */
export const command = async (dispatch) => {
  const pair = CONFIG.TRADING_PAIR;

  const response = await getOHLC(pair);
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  const {
    minAvgValue,
    maxAvgValue,
    minVolume,
    maxVolume,
    values,
    mostRecentValue,
  } = parseOHLCData(data.result[pair]);

  paintGraph(values, pair, minAvgValue, maxAvgValue, minVolume, maxVolume);

  dispatch({
    type: "OHLC_FETCH_SUCCEEDED",
    state: {
      pair,
      minAvgValue,
      maxAvgValue,
      mostRecentValue,
      error: data.error,
    },
  });
};

/**
 * Übersicht defined fn
 * Function called when an event is dispatched
 */
export const updateState = (event, previousState) => {
  switch (event.type) {
    case "OHLC_FETCH_SUCCEEDED":
      return { ...previousState, ...event.state };
    default:
      return previousState;
  }
};

/**
 * Root Component
 */

const root = css`
  padding: 1em;
  display: flex;
  color: white;
`;

export const initialState = {
  error: null,
  pair: CONFIG.TRADING_PAIR,
};

/**
 * Übersicht defined fn
 * Render fn that Übersicht calls
 */
export const render = (state) => {
  const { error, pair, minAvgValue, maxAvgValue, mostRecentValue } = state;

  // Mildest of error checking
  if (error && typeof error === "object" && error.length > 0) {
    console.log(error);
    return <div className={root}>{`😔`}</div>;
  }

  // If we haven't received data yet
  if (!mostRecentValue) {
    return (
      <div className={root}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={root}>
      <Price price={mostRecentValue} pair={pair}></Price>
      <Graph
        pair={pair}
        minAvgValue={minAvgValue}
        maxAvgValue={maxAvgValue}
      ></Graph>
    </div>
  );
};
