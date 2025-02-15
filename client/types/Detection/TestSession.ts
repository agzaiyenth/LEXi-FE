import { UserResponse } from "./UserResponse";

export interface TestSessionUpdateDTO {
  testSessionId: number;
  newDifficultyLevel: number;
}

export interface TestSessionDTO {
  testSessionId: number;
  userId: number;
  currentDifficulty: number;
  isCompleted: boolean;
}


export interface TestSession {
  id: number;
  userId: number;
  responses: UserResponse[];
  currentDifficulty: number; // Adjusts dynamically
  isCompleted: boolean;
  stableCount: number; // Tracks consecutive stable responses
}