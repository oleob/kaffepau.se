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
): "left" | "right" => {
  if (
    !!question &&
    Object.values(question.alternatives)[0].value === vote.value
  ) {
    return "left";
  }
  return "right";
};

export const Emitter = () => {
  const activeQuestionId = useActiveQuestion();
  const question = useQuestion(activeQuestionId);
  const vote = useNewVote(activeQuestionId);

  const [activeParticles, setActiveParticles] = useState<
    Record<string, Vote & { animation: string }>
  >({});

  const addNewParticle = (vote: Vote) => {
    const start = getStart(question, vote);
    const endPos = createPos();
    const animation = keyframes`
          0% {
        ${start}: 0;
        bottom: 0;
      }
      50% {
        ${start}: ${endPos.x / 2}px;
        bottom: ${endPos.y / 2}px;
        opacity: 1;
      }
      100% {
        opacity: 0;
        ${start}: ${endPos.x}px;
        bottom: ${endPos.y}px;
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
