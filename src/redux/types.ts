import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from './reducers'

export type QuestionType =
  | 'Short answer (max 255 chars)'
  | 'Long answer (max 10,000 chars)'
  | 'Dropdown'
  | 'Multiple choice (list)'
  | 'Multiple choice (grid)'
  | 'Checkbox'
  | 'Linear scale'
  | 'Date'
  | 'Time'
  | 'Email'
  | 'Numeric values'

export interface Question {
  questionId: string
  sectionId: string
  questionText?: string
  type: QuestionType
  options?: string[]
  correctAnswers?: string[]
}

export interface Section {
  sectionId: string
  title: string
  description: string
  questions: Question[]
}

export interface Survey {
  surveyId: string
  title: string
  description: string
  sections: Section[]
}

export interface SurveysState {
  surveys: Survey[]
}

// Action types
export const CREATE_SURVEY = 'CREATE_SURVEY'
export const ADD_SECTION = 'ADD_SECTION'
export const ADD_QUESTION = 'ADD_QUESTION'

interface CreateSurveyAction {
  type: typeof CREATE_SURVEY
  payload: Survey
}

interface AddSectionAction {
  type: typeof ADD_SECTION
  payload: {
    surveyId: string
    section: Section
  }
}

interface AddQuestionAction {
  type: typeof ADD_QUESTION
  payload: {
    surveyId: string
    sectionId: string
    question: Question
  }
}

export type SurveysActionTypes =
  | CreateSurveyAction
  | AddSectionAction
  | AddQuestionAction

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
