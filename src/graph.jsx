import { css } from "uebersicht";
import { CONFIG } from "./config.js";
import { ohlc } from "./constants.js";
import { toInt } from "./utils.js";

/**
 * Graph widget
 */

const graphContainer = css`
  padding-left: 1em;
  color: white;
  font-weight: lighter;
  margin: unset;
  font-size: 3em;
  display: flex;
`;

const graphScale = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const graphMetric = css`
  color: #ffffff55;
  font-weight: lighter;
  font-size: 0.3em;
  margin: 0;
`;

const graph = css`
  padding-left: 0.1em;
`;

export const Graph = ({ pair, minAvgValue, maxAvgValue }) => {
  return (
    <div className={graphContainer}>
      <div className={graphScale}>
        <h6 className={graphMetric}>{maxAvgValue}</h6>
        <h6 className={graphMetric}>{minAvgValue}</h6>
      </div>
      <canvas className={graph} id={pair}></canvas>
    </div>
  );
};

/**
 * Graph utils
 */

export const paintGraph = (
  values,
  pair,
  minAvgValue,
  maxAvgValue,
  minVolume,
  maxVolume
) => {
  const canvas = document.getElementById(pair);

  // First render won't have the canvas
  if (!canvas) return;

  if (canvas && canvas.getContext) {
    // Set canvas size
    canvas.height = 200;
    canvas.width = 720;

    // Draw Graph
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    values.forEach((item, index) => {
      ctx.beginPath();
      ctx.strokeStyle = getVolumeColor(
        toInt(item[ohlc.volume]),
        minVolume,
        maxVolume
      );

      let x = (index / values.length) * canvas.width;
      let y =
        ((item[ohlc.vwap] - minAvgValue) / (maxAvgValue - minAvgValue)) *
        canvas.height;
      ctx.rect(x, y, 1, 1);
      ctx.closePath();
      ctx.stroke();
    });
  }
};

const getVolumeColor = (volume, min, max) => {
  return CONFIG.SELECTED_GRAPH_COLOR[
    Math.floor(((volume - min) / (max - min)) * 5)
  ];
};
