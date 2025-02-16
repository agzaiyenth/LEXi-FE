export interface TestResultDTO {
  testSessionId: number;
  userId: number;
  normalizedScore: number;       // The normalized weighted score (0-10 scale)
  finalDifficultyLevel: number;  // The difficulty level at which the test stabilized
  severityZone: string;          // The dyslexia severity zone description (e.g., "Mild (Green Zone)")
}

export interface TestResult {
    id: number;
    testSessionId: number;
    normalizedScore: number;
    finalDifficultyLevel: number; // 1-10 Scale
    severityZone: string; // "Mild", "Moderate", "Severe"
  }
