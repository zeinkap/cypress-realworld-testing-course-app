export type LessonTableOfContents = {
  content: string
  slug: string
  lvl: number
  current?: boolean
}

export type EvenNumbers = [2, 4, 6, 8, 10, 12,14, 16, 18, 20, 22, 24, 26, 28, 30]

export interface ChallengeAnswer {
  id: string
  answeredCorrectly?: boolean
  skipped?: boolean
}
export interface EventPayload {
  type: string
  id: string
  challengeIndex: number
}

export interface MultipleChoicePayload extends EventPayload {
  userAnswerIndex: number
}

export interface ProgressContext {
  sectionsCompleted: string[]
  lessons: object[]
  disableChallenges: boolean
}

export interface Challenge {
  challengeType: string
  question: string
}

export interface MultipleChoiceChallenge extends Challenge {
  answers: []
  correctAnswerIndex: string
}
