import type { Question } from "../types/FAQ";

export const defaultCommunityQuestions: Question[] = [
  {
    _id: "default-question-1",
    title: "Is my location data secure and private?",
    description: "I'm concerned about privacy. How does SafePathAI handle my location data? Is it encrypted and who has access to it?",
    category: "Safety",
    answers: [
      {
        _id: "default-answer-1",
        content: "Yes, your privacy is our top priority! SafePathAI uses end-to-end encryption for all location data. Your information is never sold to third parties, and you have full control over data sharing settings. Location data is only used to provide real-time safety recommendations and is automatically deleted after 30 days.",
        upvotes: 24,
        downvotes: 1,
        isAccepted: true,
        author: { name: "SafePathAI Team" }
      },
      
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    _id: "default-question-2",
    title: "Can I customize my safety preferences?",
    description: "I'd like to adjust what SafePathAI considers as 'safe' based on my personal comfort level. Is this possible?",
    category: "App Features",
    answers: [
      {
        _id: "default-answer-2",
        content: "Absolutely. We take your privacy seriously. Your location data is encrypted end-to-end and only used to provide safety features. We never share your personal information with third parties without your explicit consent. You can review our privacy policy for more details",
        upvotes: 18,
        downvotes: 0,
        isAccepted: true,
        author: { name: "SafePathAI Team" }
      }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  }
];