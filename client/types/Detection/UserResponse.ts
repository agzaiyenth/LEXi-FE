export interface UserResponse {
    id: number;
    testSessionId: number;
    questionId: number;
    userAnswer?: string; // Optional for non-text answers
    audioFileUrl?: string; // Optional for audio-based answers
    pronunciationScore?: number; // Optional score
    isCorrect: boolean;
    responseTime: number; // Time taken to respond
  }