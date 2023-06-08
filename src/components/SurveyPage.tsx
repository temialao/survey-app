import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/reducers'
import { Section, Question } from '../redux/types'

const SurveyPage: React.FC = () => {
  const { surveyId } = useParams()
  const surveyIdStr: string = surveyId as string

  const survey = useSelector((state: AppState) =>
    state.survey.surveys.find((survey) => survey.surveyId === surveyIdStr)
  )

  if (!survey) {
    return <div>Loading survey...</div>
  }

  return (
    <div>
      <h1>{survey.title}</h1>
      <p>{survey.description}</p>
      {survey.sections.map((section: Section, i: number) => (
        <div key={i}>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
          {section.questions.map((question: Question, j: number) => (
            <div key={j}>
              <p>{question.questionText}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default SurveyPage
