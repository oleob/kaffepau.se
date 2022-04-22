import styled from "@emotion/styled";
import { useMemo } from "react";
import { Question } from "./models/Question";

export const VoteBar = ({
  votes,
  question,
}: {
  votes: Record<string, number>;
  question: Question;
}) => {
  const total = useMemo(
    () => Object.values(votes).reduce((sum, value) => sum + value, 0),

    [votes]
  );

  console.log(Object.values(question.alternatives).length);

  return (
    <S.VoteBar>
      {Object.values(question.alternatives || {}).map(({ color, value }) => (
        <S.Part
          key={value}
          value={
            total > 0
              ? ((100 * (votes?.[value] ?? 0)) / total).toFixed(2)
              : (100 / Object.values(question.alternatives).length).toFixed(2)
          }
          color={color}
        />
      ))}
    </S.VoteBar>
  );
};

const S = {
  Part: styled.div<{ value: string; color: string }>`
    height: 20px;
    width: ${({ value }) => value}%;
    background-color: ${({ color }) => color};
    transition: width 0.1s ease-in-out;
  `,
  VoteBar: styled.div`
    display: flex;
    width: 70%;
    border-radius: 9999px;
    border: 2px solid rgba(25, 25, 35, 0.9);
    overflow: hidden;
  `,
};
