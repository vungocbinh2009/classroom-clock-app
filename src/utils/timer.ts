import Timer from "easytimer.js";

export let formatNumber = (number: number): string => {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

export let displayTime = (hours: number, minutes: number, seconds: number,totalSeconds: number): string => {
  let result = "";
  if (totalSeconds >= 3600) {
    result = `${hours}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  } else if (totalSeconds >= 60) {
    result = `${formatNumber(minutes)}:${formatNumber(seconds)}`;
  } else {
    result = `${formatNumber(seconds)}`;
  }
  return result;
};
