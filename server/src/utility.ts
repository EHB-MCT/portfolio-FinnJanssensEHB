/**This file contains utility functions */

export function calculateDelay(plannedTime: Date, realTime: Date) {
  return Math.abs(realTime.getTime() - plannedTime.getTime());
}

//source: https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
