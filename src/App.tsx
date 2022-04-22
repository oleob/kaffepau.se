import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import { loadVideo } from "./video/video";
import { useEffect } from "react";
import { sendAnswer, useActiveQuestion, useQuestion } from "./api/questionApi";
import { Overlay } from "./Overlay";

function App() {
  const activeQuestionId = useActiveQuestion();
  const activeQuestion = useQuestion(activeQuestionId);
  useEffect(() => {
    const hls = loadVideo();
    return () => {
      hls?.destroy();
    };
  }, []);
  const tapHandler = (alternative: string) => {
    const id = uuidv4();

    sendAnswer(
      { value: alternative, created: new Date().toISOString(), id },
      activeQuestionId
    );
  };

  return (
    <S.RootView>
      <S.VideoBackground>
        <S.VideoWrapper>
          <S.Video autoPlay playsInline muted id="video" />
          <Overlay />
        </S.VideoWrapper>
      </S.VideoBackground>
      {!!activeQuestion && (
        <S.Question>
          <S.Description>{activeQuestion.description}</S.Description>
          <S.ButtonContainer>
            {Object.values(activeQuestion.alternatives).map((alternative) => (
              <S.Button
                key={alternative.value}
                onClick={() => tapHandler(alternative.value)}
              >
                <S.ButtonContents color={alternative.color}>
                  <div>{alternative.emoji}</div>
                </S.ButtonContents>
                <div>{alternative.value}</div>
              </S.Button>
            ))}
          </S.ButtonContainer>
        </S.Question>
      )}
    </S.RootView>
  );
}

const S = {
  Question: styled.div`
    margin-top: 2rem;
    max-width: 30rem;
    padding: 1rem;
    background-color: #399e5a;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
  `,

  Description: styled.h1`
    text-align: center;
  `,
  Label: styled.label`
    display: flex;
    flex-direction: column;
    width: fit-content;
  `,
  RootView: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  VideoBackground: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #191923;
  `,
  VideoWrapper: styled.div`
    max-width: 40rem;
    position: relative;
  `,
  ButtonContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    padding: 1rem 2rem;
    gap: 1rem;
    flex-wrap: wrap;
  `,
  Button: styled.button`
    background-color: rgba(25, 25, 35, 0.7);
    border: none;
    color: #fbfef9;
    padding: 1rem;
    border-radius: 4px;
    width: fit-content;
    text-align: center;
    padding: 0;
    overflow: hidden;
    transition: all ease-in-out 0.1s;
    &:active {
      transform: scale(0.9);
    }
  `,
  Video: styled.video`
    object-fit: cover;
  `,
  ButtonContents: styled.div<{ color: string }>`
    background-color: ${({ color }) => color};
    text-align: center;
    padding: 0.5rem 2rem;
    font-size: 3rem;
  `,
};

export default App;
