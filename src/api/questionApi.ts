import {
  getDatabase,
  onChildAdded,
  onValue,
  ref,
  set,
  Unsubscribe,
} from "firebase/database";
import { useEffect, useMemo, useRef, useState } from "react";
import { Question } from "../models/Question";
import { Vote } from "../models/Vote";

const db = getDatabase();

const useSubscriberHandler = (effect: () => Unsubscribe) => {
  const unsubscribe = useRef<Unsubscribe>();
  useEffect(() => {
    return () => {
      unsubscribe.current?.();
    };
  }, []);
  return () => {
    if (unsubscribe.current) {
      unsubscribe.current();
    }
    unsubscribe.current = effect();
  };
};

export const sendAnswer = (vote: Vote, questionId: string) => {
  set(ref(db, `votes/${questionId}/${vote.id}`), vote);
};

export const useQuestion = (questionId: string) => {
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const effectHandler = useSubscriberHandler(() => {
    const questionsRef = ref(db, `questions/${questionId}/`);
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      if (questionId) {
        const data: Question = snapshot.val();
        setQuestion(data);
      } else {
        setQuestion(undefined);
      }
    });
    return unsubscribe;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHandler, [questionId]);
  return question;
};

export const useActiveQuestion = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<string>("");
  const effectHandler = useSubscriberHandler(() => {
    const questionsRef = ref(db, "active-question");
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const data: string = snapshot.val();
      setActiveQuestionId(data);
    });
    return unsubscribe;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHandler, []);
  return activeQuestionId;
};

export const useVoteCount = (questionId: string) => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const effectHandler = useSubscriberHandler(() => {
    const questionsRef = ref(db, `votes/${questionId}/`);
    const unsubscribe = onValue(questionsRef, (snapshot) => {
      const votes: Record<string, Vote> = snapshot.val() ?? {};
      const voteCount: Record<string, number> = {};
      Object.values(votes).forEach((vote) => {
        voteCount[vote.value] = (voteCount[vote.value] ?? 0) + 1;
      });
      setVotes(voteCount);
    });
    return unsubscribe;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHandler, [questionId]);
  return votes;
};

export const useNewVote = (questionId: string) => {
  const [vote, setVote] = useState<Vote>();
  const mountTime = useMemo(() => new Date().getTime(), []);
  const effectHandler = useSubscriberHandler(() => {
    const questionsRef = ref(db, `votes/${questionId}/`);
    const unsubscribe = onChildAdded(questionsRef, (snapshot) => {
      if (new Date().getTime() - mountTime > 2000) {
        const data: Vote = snapshot.val();
        setVote(data);
      }
    });
    return unsubscribe;
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHandler, [questionId]);
  return vote;
};
