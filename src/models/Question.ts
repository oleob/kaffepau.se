export type Question = {
  id: string;
  programId: string;
  description: string;
  created: string;
  alternatives: Record<string, Alternative>;
};

export type Alternative = {
  color: string,
  value: string,
  emoji: string
}

export type LiveQuestion = string | undefined;
