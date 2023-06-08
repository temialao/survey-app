import { combineReducers } from '@reduxjs/toolkit'
import surveyReducer from './surveyReducer'

export const rootReducer = combineReducers({
  survey: surveyReducer,
})

export type AppState = ReturnType<typeof rootReducer>
