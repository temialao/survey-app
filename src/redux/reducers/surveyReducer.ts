import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Survey, Section, Question } from '../types'

interface SurveyState {
  surveys: Survey[]
}

const initialState: SurveyState = {
  surveys: [],
}

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    createSurvey: (state, action: PayloadAction<Survey>) => {
      state.surveys.push(action.payload)
    },
    addSection: (
      state,
      action: PayloadAction<{ surveyId: string; section: Section }>
    ) => {
      const { surveyId, section } = action.payload
      const survey = state.surveys.find(
        (survey) => survey.surveyId === surveyId
      )
      if (survey) {
        survey.sections.push(section)
      }
    },
    addQuestion: (
      state,
      action: PayloadAction<{
        surveyId: string
        sectionId: string
        question: Question
      }>
    ) => {
      const { surveyId, sectionId, question } = action.payload
      const survey = state.surveys.find(
        (survey) => survey.surveyId === surveyId
      )
      if (survey) {
        const section = survey.sections.find(
          (section) => section.sectionId === sectionId
        )
        if (section) {
          section.questions.push(question)
        }
      }
    },
  },
})

export const { createSurvey, addSection, addQuestion } = surveySlice.actions
export default surveySlice.reducer
