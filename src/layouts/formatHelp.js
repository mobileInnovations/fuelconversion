import {
  mdiSunAngleOutline,
  mdiWhiteBalanceSunny,
  mdiWeatherSunset,
} from "@mdi/js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/th";
import "dayjs/locale/en";

const lang = localStorage.getItem("LANG") || "en";

dayjs.extend(customParseFormat);

/**
 * Formats a date into 'YYYY-MM-DD HH:mm:ss' format.
 * @param {Date|string} date - The date object or string to format.
 * @returns {string} - The formatted date and time string.
 */
export function formatDateTime({ date, time }) {
  if (!date || date === null) {
    console.warn(
      "⚠️ 'date' is required in the object you pass to formatDateTime()"
    );
    return "";
  }

  if (time instanceof Date) {
    time = dayjs(time).format("HH:mm:ss");
  }
  let parsedDate;

  // Try parsing with Thai locale
  parsedDate = dayjs(date, "DD MMM YYYY", "th", true);
  if (!parsedDate.isValid()) {
    // Try parsing with English locale
    parsedDate = dayjs(date, "DD MMM YYYY", "en", true);
  }
  if (!parsedDate.isValid()) {
    // Fallback: try letting dayjs guess the format
    parsedDate = dayjs(date);
  }

  if (!parsedDate.isValid()) return "";

  const formattedDate = parsedDate.format("YYYY-MM-DD");

  return time ? `${formattedDate} ${time}` : formattedDate;
}

export function formatTime(time) {
  if (!time || time === null) {
    return "";
  }
  if (time instanceof Date) {
    return dayjs(time).format("HH:mm:ss");
  }
  return dayjs(time).format("HH:mm:ss");
}

export function getGreetingText() {
  const currentTime = new Date();
  const hours = currentTime.getHours(); // Get the current hour (0-23)
  let morning = "Morning";
  let afternoon = "Afternoon";
  let evening = "Evening";

  if (localStorage.getItem("LANG") === "th") {
    morning = "ตอนเช้า";
    afternoon = "ตอนเที่ยง";
    evening = "ตอนเย็น";
  }
  if (hours >= 5 && hours < 12) {
    return morning;
  } else if (hours >= 12 && hours < 18) {
    return afternoon;
  } else {
    return evening;
  }
}

export function getIconTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  if (hours >= 5 && hours < 12) {
    return mdiSunAngleOutline;
  } else if (hours >= 12 && hours < 18) {
    return mdiWhiteBalanceSunny;
  } else {
    return mdiWeatherSunset;
  }
}

export function allowedStartDates(date) {
  const checkDate = new Date(date);
  const today = new Date();
  return checkDate <= today;
}

export function allowedEndDates(selectedStart) {
  return (date) => {
    if (!selectedStart) return true;
    const today = new Date();
    const checkDate = new Date(date);
    const start = new Date(selectedStart);
    return checkDate >= start && checkDate <= today;
  };
}

/**
 * Converts minutes into a human-readable string:
 * - 60 -> "1 hour"
 * - 1500 -> "1 day 1 hour"
 * - 44640 -> "1 month 1 day"
 * - 525600 -> "1 year"
 *
 * @param {number} minutes
 * @returns {string}
 */
export function formatDurationFromMinutes(minutes) {
  let MINS = lang === "th" ? "นาที" : "mins";

  if (!minutes || isNaN(minutes) || minutes < 1) return `0 ${MINS}`;

  const MINUTES_IN_YEAR = 525600;
  const MINUTES_IN_MONTH = 43200;
  const MINUTES_IN_DAY = 1440;
  const MINUTES_IN_HOUR = 60;

  const years = Math.floor(minutes / MINUTES_IN_YEAR);
  minutes %= MINUTES_IN_YEAR;

  const months = Math.floor(minutes / MINUTES_IN_MONTH);
  minutes %= MINUTES_IN_MONTH;

  const days = Math.floor(minutes / MINUTES_IN_DAY);
  minutes %= MINUTES_IN_DAY;

  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  minutes %= MINUTES_IN_HOUR;

  const parts = [];

  if (lang === "th") {
    if (years) parts.push(`${years} ปี`);
    if (months) parts.push(`${months} เดือน`);
    if (days) parts.push(`${days} วัน`);
    if (hours) parts.push(`${hours} ชั่วโมง`);
    if (minutes) parts.push(`${minutes.toFixed(2)} นาที`);
  } else {
    if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    if (minutes)
      parts.push(`${minutes.toFixed(2)} min${minutes > 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}

/**
 * Converts hours into a human-readable string:
 * - 1 -> "1 hour"
 * - 25 -> "1 day 1 hour"
 * - 750 -> "1 month 15 hours"
 * - 8760 -> "1 year"
 *
 * @param {number} hours
 * @returns {string}
 */
export function formatDurationFromHours(hours) {
  let HRS = lang === "th" ? "ชั่วโมง" : "hours";

  if (!hours || isNaN(hours) || hours < 1) return `0 ${HRS}`;

  const HOURS_IN_YEAR = 8760;
  const HOURS_IN_MONTH = 720;
  const HOURS_IN_DAY = 24;

  const years = Math.floor(hours / HOURS_IN_YEAR);
  hours %= HOURS_IN_YEAR;

  const months = Math.floor(hours / HOURS_IN_MONTH);
  hours %= HOURS_IN_MONTH;

  const days = Math.floor(hours / HOURS_IN_DAY);
  hours %= HOURS_IN_DAY;

  const parts = [];

  if (lang === "th") {
    if (years) parts.push(`${years} ปี`);
    if (months) parts.push(`${months} เดือน`);
    if (days) parts.push(`${days} วัน`);
    if (hours) parts.push(`${hours.toFixed(2)} ชั่วโมง`);
  } else {
    if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
    if (hours)
      parts.push(`${hours.toFixed(2)} hour${hours > 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}

