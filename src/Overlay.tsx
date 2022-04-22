import styled from "@emotion/styled";
import {
  useActiveQuestion,
  useQuestion,
  useVoteCount,
} from "./api/questionApi";
import { Emitter } from "./Emitter";
import { VoteBar } from "./VoteBar";

export const Overlay = () => {
  const activeQuestionId = useActiveQuestion();
  const activeQuestion = useQuestion(activeQuestionId);
  const voteCount = useVoteCount(activeQuestionId);

  return (
    <S.Overlay>
      {!!activeQuestion && (
        <>
          <VoteBar votes={voteCount} question={activeQuestion} />
          <Emitter />
        </>
      )}
    </S.Overlay>
  );
};

const S = {
  Overlay: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 1rem;
  `,
};
