const PROXY = "http://127.0.0.1:41417/";
import { CONFIG } from "./config.js";
import { ohlc } from "./constants.js";
import { toInt } from "./utils.js";

const api = async (query) =>
  await fetch(new URL(`${PROXY}https://api.kraken.com${query}`));

export const getOHLC = async (pair) =>
  api(`/0/public/OHLC?pair=${pair}&interval=${CONFIG.SELECTED_DATERANGE}`);

export const parseOHLCData = (list) => {
  let minAvgValue;
  let maxAvgValue;
  let minVolume;
  let maxVolume;

  const values = list.map((item) => {
    const average = toInt(item[ohlc.vwap]);
    minAvgValue = minAvgValue ? Math.min(minAvgValue, average) : average;
    maxAvgValue = maxAvgValue ? Math.max(maxAvgValue, average) : average;
    minVolume = minVolume
      ? Math.min(minVolume, toInt(item[ohlc.volume]))
      : toInt(item[ohlc.volume]);
    maxVolume = maxVolume
      ? Math.max(maxVolume, toInt(item[ohlc.volume]))
      : toInt(item[ohlc.volume]);
    item.push(average);
    return item;
  });

  return {
    minAvgValue,
    maxAvgValue,
    minVolume,
    maxVolume,
    values,
    mostRecentValue: toInt(values[values.length - 1][ohlc.vwap]),
  };
};
