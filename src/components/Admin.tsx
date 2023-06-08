import React from 'react'
import CreateSurveyButton from './CreateSurveyButton'

const Admin: React.FC = () => {
  return (
    <div className='flex flex-col items-center mt-12'>
      <h1 className='text-2xl font-semibold mb-4'>Admin Component</h1>
      <CreateSurveyButton />
    </div>
  )
}

export default Admin
