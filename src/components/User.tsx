import React from 'react'
import SurveyList from './SurveyList'

const User: React.FC = () => {
  return (
    <div className='flex flex-col items-center mt-12'>
      <h1 className='text-3xl text-blue-600 font-semibold mb-6'>
        Select a survey
      </h1>
      <SurveyList />
    </div>
  )
}

export default User
