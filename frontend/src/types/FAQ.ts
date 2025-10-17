export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface Answer {
  _id: string;
  content: string;
  upvotes: number;
  downvotes?: number;
  isAccepted: boolean;
  author?: { name: string };
}

export interface Question {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  answers: Answer[];
  createdAt: string;
}
