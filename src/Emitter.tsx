import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useActiveQuestion, useNewVote, useQuestion } from "./api/questionApi";
import { Question } from "./models/Question";
import { Vote } from "./models/Vote";

const createPos = () => {
  const video = document.getElementById("video");
  if (video) {
    const rect = video.getBoundingClientRect();
    return {
      x: Math.round((rect.width / 1.5) * Math.random()),
      y: Math.round((rect.height / 1.5) * Math.random()),
    };
  }
  return {
    x: 200,
    y: 200,
  };
};

const getStart = (
  question: Question | undefined,
  vote: Vote
): [string, string] => {
  const alternativeList = Object.values(question?.alternatives ?? {});
  if (alternativeList[0].value === vote.value) {
    return ["left", "bottom"];
  }
  if (alternativeList[1].value === vote.value) {
    return ["right", "bottom"];
  }
  if (alternativeList[2].value === vote.value) {
    return ["left", "top"];
  }
  return ["right", "top"];
};

export const Emitter = () => {
  const activeQuestionId = useActiveQuestion();
  const question = useQuestion(activeQuestionId);
  const vote = useNewVote(activeQuestionId);

  const [activeParticles, setActiveParticles] = useState<
    Record<string, Vote & { animation: string }>
  >({});

  const addNewParticle = (vote: Vote) => {
    const [startH, startV] = getStart(question, vote);
    const endPos = createPos();
    const animation = keyframes`
          0% {
        transform: scale(0);
        ${startH}: -10px;
        ${startV}: -10px;
      }
      25% {
        transform: scale(1);
      }
      50% {
        ${startH}: ${endPos.x / 2}px;
        ${startV}: ${endPos.y / 2}px;
        opacity: 1;
      }
      100% {
        opacity: 0;
        ${startH}: ${endPos.x}px;
        ${startV}: ${endPos.y}px;
      }
    `;
    setActiveParticles((prevValue) => ({
      ...prevValue,
      [vote.id]: { ...vote, animation },
    }));

    setTimeout(() => {
      setActiveParticles((prevValue) => {
        const newValue = { ...prevValue };
        delete newValue[vote.id];
        return newValue;
      });
    }, 2000);
  };

  useEffect(() => {
    if (vote) {
      addNewParticle(vote);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote]);

  return (
    <>
      {!!question &&
        Object.values(activeParticles).map((vote) => (
          <S.Particle key={vote.id} animation={vote.animation}>
            {question.alternatives[vote.value].emoji}
          </S.Particle>
        ))}
    </>
  );
};

const S = {
  Emitter: styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
  `,
  Particle: styled.div<{ animation: string }>`
    font-size: 2rem;
    position: absolute;
    animation: ${({ animation }) => animation} 2s linear;
  `,
};
