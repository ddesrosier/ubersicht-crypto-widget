import {
  COLORS,
  KRAKEN_PAIRS,
  OHLC_INTERVALS,
  REFRESH_FREQUENCY,
} from "./constants.js";

export const CONFIG = {
  // Pair to display
  TRADING_PAIR: KRAKEN_PAIRS.BTCUSD,
  // The colors for the graph
  SELECTED_GRAPH_COLOR: COLORS.green,
  //
  SELECTED_DATERANGE: OHLC_INTERVALS.twelvedays,
  REFRESH_FREQUENCY: REFRESH_FREQUENCY.sixty,
};
