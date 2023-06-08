import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/reducers'
import { Link } from 'react-router-dom'
import { Survey } from '../redux/types'

const SurveyList: React.FC = () => {
  const surveys = useSelector((state: AppState) => state.survey.surveys)

  if (surveys.length === 0) {
    return <h1>No surveys available</h1>
  }

  return (
    <div>
      <h1>Available Surveys</h1>
      {surveys.map((survey: Survey, index: number) => (
        <div key={index}>
          <h2>{survey.title}</h2>
          <Link to={`/survey/${survey.surveyId}`}>Start Survey</Link>
        </div>
      ))}
    </div>
  )
}

export default SurveyList
