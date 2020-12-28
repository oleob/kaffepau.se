import { differenceInMinutes, format, isAfter } from "date-fns";

export const createWeekendText = () => ({
  text: "Det er helg, og dermed ingen kaffepause i dag.",
  emojis: "🚫☕",
});

export const createBreakText = (date: Date, breakEnd: Date) => {
  const minutesLeft = differenceInMinutes(breakEnd, date) + 1;
  const text = `Det er pause!\n Pausen er over om ${minutesLeft} ${
    minutesLeft === 1 ? "minutt" : "minutter"
  }`;
  return {
    text,
    emojis: "☕",
  };
};

export const createNoBreakText = (
  date: Date,
  breakStart: Date,
  breakEnd: Date
) => {
  const text = `Det er ikke pause.\n Dagens pause ${
    isAfter(date, breakEnd) ? "var" : "er"
  } fra ${format(breakStart, "HH:mm")} til ${format(breakEnd, "HH:mm")}.`;

  return {
    text,
    emojis: "🚫☕",
  };
};

export const createHolidayText = () => {
  return {
    text: "Det er helligdag, og dermed ingen kaffepause i dag.",
    emojis: "🚫☕",
  };
};
