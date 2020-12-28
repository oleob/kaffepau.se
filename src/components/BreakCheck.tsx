import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isWeekend, isWithinInterval, set } from "date-fns";
import { addMinutes } from "date-fns/esm";
import styled from "styled-components";

import Container from "./Container";
import {
  createBreakText,
  createHolidayText,
  createNoBreakText,
  createWeekendText,
} from "../helpers/textCreators";
import { isHoliday } from "../helpers/isHoliday";

const H1 = styled.h1`
  white-space: pre-line;
  text-align: center;
`;

const Emojis = styled.p`
  font-size: 4rem;
`;

const breakCheck = (time: string, lengthInMinutes: string) => {
  const [hours, minutes] = time.split(":").map((value) => +value);

  const date = new Date();
  let breakStart = set(date, { hours, minutes, seconds: 0 });
  const breakEnd = addMinutes(breakStart, +lengthInMinutes);
  const isBreak = isWithinInterval(date, { start: breakStart, end: breakEnd });
  const isDateOnWeekend = isWeekend(date);
  const isDateonHoliday = isHoliday(date);
  let content = {
    text: "",
    emojis: "",
  };
  if (isDateonHoliday) {
    content = createHolidayText();
  } else if (isDateOnWeekend) {
    content = createWeekendText();
  } else if (isBreak) {
    content = createBreakText(date, breakEnd);
  } else {
    content = createNoBreakText(date, breakStart, breakEnd);
  }

  const { text, emojis } = content;

  return {
    text,
    emojis,
    isBreak,
    isDateOnWeekend,
  };
};

const BreakCheck: FC = () => {
  const { time = "14:00", lengthInMinutes = "15" } = useParams<{
    time: string;
    lengthInMinutes: string;
  }>();

  const [state, setState] = useState(() => breakCheck(time, lengthInMinutes));

  const { text, emojis, isDateOnWeekend, isBreak } = state;

  useEffect(() => {
    const interval = setInterval(() => {
      setState(breakCheck(time, lengthInMinutes));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [lengthInMinutes, time]);

  return (
    <Container type={!isDateOnWeekend && isBreak ? "break" : "nobreak"}>
      <H1>{text}</H1>
      <Emojis>{emojis}</Emojis>
    </Container>
  );
};

export default BreakCheck;
