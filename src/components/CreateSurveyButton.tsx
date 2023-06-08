import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateSurveyButton: React.FC = () => {
  const navigate = useNavigate()

  const handleCreateSurvey = () => {
    navigate('/create-survey')
  }

  return (
    <button
      onClick={handleCreateSurvey}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      Create Survey
    </button>
  )
}

export default CreateSurveyButton
