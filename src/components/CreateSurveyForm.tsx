/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react'
import { createSurvey } from '../redux/reducers/surveyReducer'
import { Survey, Section as SectionType } from '../redux/types'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Section from './SurveySection'
import { useNavigate } from 'react-router-dom'

const CreateSurveyForm: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [survey, setSurvey] = useState<Omit<Survey, 'surveyId'>>({
    title: '',
    description: '',
    sections: [
      {
        sectionId: uuidv4(),
        title: '',
        description: '',
        questions: [],
      },
    ],
  })

  const [sectionTitle, setSectionTitle] = useState('')
  const [sectionDescription, setSectionDescription] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey({ ...survey, title: e.target.value })
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurvey({ ...survey, description: e.target.value })
  }

  const handleUpdateSection = (updatedSection: SectionType) => {
    // Find the index of the section in the sections array
    const index = survey.sections.findIndex(
      (section) => section.sectionId === updatedSection.sectionId
    )

    // If the section was found
    if (index !== -1) {
      const updatedSections = [...survey.sections]
      updatedSections[index] = updatedSection

      setSurvey({
        ...survey,
        sections: updatedSections,
      })
    }
  }

  const handleAddSection = () => {
    setSurvey({
      ...survey,
      sections: [
        ...survey.sections,
        {
          sectionId: uuidv4(),
          title: sectionTitle,
          description: sectionDescription,
          questions: [],
        },
      ],
    })
    setSectionTitle('') // Reset section title
    setSectionDescription('') // Reset section description
  }

  const handleDeleteSection = (sectionId: string) => {
    setSurvey({
      ...survey,
      sections: survey.sections.filter(
        (section) => section.sectionId !== sectionId
      ),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(createSurvey({ ...survey, surveyId: uuidv4() }))
    console.log(survey)
  }

  return (
    <div className='flex flex-col items-center mt-12'>
      <h1 className='text-3xl text-blue-600 font-semibold mb-6'>
        Create a survey
      </h1>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-lg px-8 py-6 bg-white rounded shadow-lg'
      >
        <div className='w-full'>
          <label
            className='block text-gray-600 font-bold mb-2'
            htmlFor='survey-title'
          >
            Title
          </label>
          <input
            id='survey-title'
            type='text'
            value={survey.title}
            onChange={handleTitleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='w-full mt-4'>
          <label
            className='block text-gray-600 font-bold mb-2'
            htmlFor='survey-description'
          >
            Description
          </label>
          <input
            id='survey-description'
            type='text'
            value={survey.description}
            onChange={handleDescriptionChange}
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
        </div>
        <div className='w-full mt-6'>
          <div className='w-full'>
            {survey.sections.map((section) => (
              <div key={section.sectionId}>
                <Section
                  key={section.sectionId}
                  section={section}
                  updateSection={handleUpdateSection}
                  deleteSection={handleDeleteSection} // This should update the section in the survey state
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full mt-4'>
          <input
            type='text'
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            placeholder='Section title'
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          <input
            type='text'
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
            placeholder='Section description'
            className='w-full mt-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
          />
          <button
            onClick={handleAddSection}
            className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Add Section
          </button>
        </div>
        <button
          className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Submit Survey
        </button>
      </form>
      <button
        onClick={() => navigate('/preview')}
        className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Preview
      </button>
    </div>
  )
}

export default CreateSurveyForm
