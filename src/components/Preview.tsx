import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/reducers'
import { Section, Question } from '../redux/types'

const Preview: React.FC = () => {
  const survey = useSelector((state: AppState) => state.survey.surveys[0])

  return (
    <div className='flex flex-col items-center mt-12'>
      <h1 className='text-2xl font-semibold mb-4'>Survey Preview</h1>
      <h1 className='text-2xl font-semibold mb-4'>{survey.title}</h1>
      <p className='mb-8'>{survey.description}</p>
      {survey.sections.map((section: Section) => (
        <div key={section.sectionId}>
          <h2 className='text-xl font-medium mb-2'>{section.title}</h2>
          <p className='mb-4'>{section.description}</p>
          {section.questions.map((question: Question, index: number) => (
            <div key={index} className='mb-4'>
              <h3 className='text-lg mb-2'>{question.questionText}</h3>
              {(() => {
                switch (question.type) {
                  case 'Short answer (max 255 chars)':
                    return (
                      <input
                        className='border border-gray-300 rounded-md p-2 w-full'
                        type='text'
                        maxLength={255}
                        placeholder='Your answer here'
                      />
                    )
                  case 'Multiple choice (list)':
                    return (
                      question.options &&
                      question.options.map(
                        (option: string, optionIndex: number) => (
                          <label key={optionIndex} className='block mb-1'>
                            <input
                              className='mr-2'
                              type='radio'
                              name={`question-${index}`}
                              value={option}
                            />
                            {option}
                          </label>
                        )
                      )
                    )
                  case 'Long answer (max 10,000 chars)':
                    return (
                      <textarea
                        className='border border-gray-300 rounded-md p-2 w-full'
                        maxLength={10000}
                        placeholder='Your answer here'
                      />
                    )
                  case 'Dropdown':
                    return (
                      <select
                        className='border border-gray-300 rounded-md p-2 w-full'
                        defaultValue=''
                      >
                        <option disabled value=''>
                          Select an option
                        </option>
                        {question.options &&
                          question.options.map((option, optionIndex) => (
                            <option key={optionIndex} value={option}>
                              {option}
                            </option>
                          ))}
                      </select>
                    )
                  case 'Checkbox':
                    return (
                      question.options &&
                      question.options.map(
                        (option: string, optionIndex: number) => (
                          <label key={optionIndex} className='block mb-1'>
                            <input
                              className='mr-2'
                              type='checkbox'
                              name={`question-${index}`}
                              value={option}
                            />
                            {option}
                          </label>
                        )
                      )
                    )
                  case 'Multiple choice (grid)':
                    return (
                      question.options && (
                        <div className='grid grid-cols-4 gap-2'>
                          {question.options.map(
                            (option: string, optionIndex: number) => (
                              <label key={optionIndex} className='block mb-1'>
                                <input
                                  className='mr-2'
                                  type='checkbox'
                                  name={`question-${index}`}
                                  value={option}
                                />
                                {option}
                              </label>
                            )
                          )}
                        </div>
                      )
                    )
                  case 'Linear scale':
                  case 'Date':
                  case 'Time':
                  case 'Email':
                  case 'Numeric values':
                  default:
                    return null
                }
              })()}
            </div>
          ))}
        </div>
      ))}
      <button
        className='mt-4 w-half bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='submit'
      >
        Submit
      </button>
    </div>
  )
}

export default Preview
