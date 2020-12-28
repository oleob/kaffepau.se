import { isSameDay } from "date-fns";

const holidays = [
  "2020-12-31",
  "2021-01-01",
  "2021-04-01",
  "2021-04-02",
  "2021-04-05",
  "2021-04-06",
  "2021-06-01",
  "2021-06-17",
  "2021-06-24",
  "2021-12-24",
  "2021-12-25",
  "2021-12-26",
  "2021-12-31",
];

const holidayDates = holidays.map((holiday) => new Date(holiday));

export const isHoliday = (date: Date) => {
  return holidayDates.some((holiday) => isSameDay(date, holiday));
};
