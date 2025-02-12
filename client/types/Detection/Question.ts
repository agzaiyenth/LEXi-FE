export interface AnswerSubmissionDTO {
  testSessionId: number;
  questionId: number;
  userAnswer: string;
  responseTime: number; // Time in milliseconds
}

export interface QuestionResponseDTO {
  questionId: number;
  questionType: string;
  questionText: string;
  difficulty: number;
  options?: string[]; // Optional for non-multiple-choice questions
  mediaUrl?: string;  // Optional for images/audio if applicable
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  IMAGE_IDENTIFICATION = 'IMAGE_IDENTIFICATION',
  AUDIO_COMPARISON = 'AUDIO_COMPARISON',
  TEXT_INPUT = 'TEXT_INPUT',
  SEQUENCE_ORDER = 'SEQUENCE_ORDER',
  AUDIO_INPUT = 'AUDIO_INPUT',
  OTHER = 'OTHER'
}

export interface Question {
  id: number;
  questionType: QuestionType;
  difficulty: number; // Level 1-10
  questionText: string;
  isAnswerCorrect(userAnswer: string): boolean;
}


export interface AudioComparisonQuestion extends Question {
  audioUrl: string; // URL to the audio file
  correctAnswer: string;

  isAnswerCorrect(userAnswer: string): boolean;
}


export interface AudioInputQuestion extends Question {
  expectedWord: string; // The pseudo-word to be read
  accuracyThreshold: number; // Minimum accuracy to be considered correct

  isAnswerCorrect(userAudioUrl: string): boolean;
}

export interface ImageIdentificationQuestion extends Question {
  imageUrl: string; // Link to the image
  correctAnswer: string;

  isAnswerCorrect(userAnswer: string): boolean;
}

export interface MultipleChoiceQuestion extends Question {
  options: string[]; // List of answer choices
  correctAnswer: string;

  isAnswerCorrect(userAnswer: string): boolean;
}

export interface SequenceOrderQuestion extends Question {
  options: string[]; // Possible sequence options
  correctOrder: string[]; // Correct sequence

  isAnswerCorrect(userAnswer: string): boolean;
}

export interface TextInputQuestion extends Question {
  correctAnswer: string;

  isAnswerCorrect(userAnswer: string): boolean;
}