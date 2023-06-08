import React, { useState } from 'react'
import { Question, Section as SectionType } from '../redux/types'
import { v4 as uuidv4 } from 'uuid'
import { BiTrash } from 'react-icons/bi'

interface SectionProps {
  section: SectionType
  updateSection: (updatedSection: SectionType) => void
  deleteSection: (sectionId: string) => void
}

const Section: React.FC<SectionProps> = ({
  section,
  updateSection,
  deleteSection,
}) => {
  const [question, setQuestion] = useState<Question>({
    questionId: '',
    sectionId: section.sectionId,
    questionText: '',
    type: 'Short answer (max 255 chars)',
    options: [],
  })
  const [option, setOption] = useState('')

  const handleQuestionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion({ ...question, questionText: e.target.value })
  }

  const handleAddOption = () => {
    if (option.trim() !== '' && question.options) {
      setQuestion({
        ...question,
        options: [...question.options, option],
      })
      setOption('') // reset option
    }
  }

  const handleRemoveOption = (index: number) => {
    if (question.options) {
      setQuestion({
        ...question,
        options: question.options.filter(
          (_option, optionIndex) => optionIndex !== index
        ),
      })
    }
  }

  const handleQuestionTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuestion({ ...question, type: e.target.value as Question['type'] })
  }

  const handleAddQuestion = () => {
    const updatedQuestion: Question = { ...question, questionId: uuidv4() }

    const updatedSection = {
      ...section,
      questions: [...section.questions, updatedQuestion],
    }

    updateSection(updatedSection)

    setQuestion({
      questionId: '',
      sectionId: section.sectionId,
      questionText: '',
      type: 'Short answer (max 255 chars)',
      options: [],
    })
  }

  const handleDeleteQuestion = (index: number) => {
    const updatedSection = {
      ...section,
      questions: section.questions.filter(
        (_question, questionIndex) => questionIndex !== index
      ),
    }
    updateSection(updatedSection)
  }

  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = e.target
    if (checked) {
      setQuestion({
        ...question,
        correctAnswers: [...(question.correctAnswers || []), value],
      })
    } else {
      setQuestion({
        ...question,
        correctAnswers: question.correctAnswers?.filter(
          (answer) => answer !== value
        ),
      })
    }
  }

  return (
    <div className='relative mb-4 p-4 border border-gray-300 rounded'>
      <h2 className='font-semibold text-xl text-gray-800'>{section.title}</h2>
      <p className='text-gray-600'>{section.description}</p>
      {section.questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className='p-4 border-2 border-gray-200 rounded mb-4'
        >
          <p className='font-medium text-lg text-gray-700'>
            {question.questionText}
          </p>
          {question.options && question.options.length > 0 && (
            <div className='mt-4'>
              <p className='font-medium text-gray-600'>Options:</p>
              {question.options.map((option, index) => (
                <div key={index} className='flex items-center my-2'>
                  <input
                    type='checkbox'
                    id={`option${index}`}
                    name='correctAnswer'
                    value={option}
                    onChange={handleCorrectAnswerChange}
                    className='mr-2'
                  />
                  <label htmlFor={`option${index}`} className='text-gray-600'>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => handleDeleteQuestion(questionIndex)}
            className='mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded focus:outline-none focus:shadow-outline'
          >
            Delete Question
          </button>
        </div>
      ))}
      <div className='relative mb-4 p-4 border border-gray-300 rounded'>
        <label
          className='block text-gray-500 font-bold mb-2 pr-4'
          htmlFor='inline-question-type'
        >
          Write a question
        </label>
        <select
          id='inline-question-type'
          value={question.type}
          onChange={handleQuestionTypeChange}
          className='bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
        >
          <option>Short answer (max 255 chars)</option>
          <option>Long answer (max 10,000 chars)</option>
          <option>Dropdown</option>
          <option>Multiple choice (list)</option>
          <option>Multiple choice (grid)</option>
          <option>Checkbox</option>
          <option>Linear scale</option>
          <option>Date</option>
          <option>Time</option>
          <option>Email</option>
          <option>Numeric value</option>
        </select>
        {(() => {
          switch (question.type) {
            case 'Short answer (max 255 chars)':
            case 'Long answer (max 10,000 chars)':
            case 'Linear scale':
            case 'Date':
            case 'Time':
            case 'Email':
            case 'Numeric values':
              return (
                <textarea
                  rows={4}
                  onChange={handleQuestionChange}
                  value={question.questionText}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  placeholder='Enter question text'
                />
              )
            case 'Dropdown':
            case 'Multiple choice (list)':
            case 'Multiple choice (grid)':
            case 'Checkbox':
              return (
                <div>
                  <textarea
                    rows={4}
                    onChange={handleQuestionChange}
                    value={question.questionText}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder='Enter question text'
                  />
                  <ul>
                    {question.options?.map((option, index) => (
                      <div key={index}>
                        <li
                          key={index}
                          className='flex items-center justify-between bg-white px-3 py-2 mb-2 rounded shadow'
                        >
                          <input type='checkbox' className='mr-2' />
                          <span className='text-gray-700'>{option}</span>
                          <button
                            onClick={() => handleRemoveOption(index)}
                            className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'
                          >
                            <BiTrash />
                          </button>
                        </li>
                      </div>
                    ))}
                  </ul>
                  <p className='text-sm text-gray-500 mt-2'>
                    Please select the correct options.
                  </p>
                  <div className='flex items-center justify-between w-full mt-2'>
                    <input
                      type='text'
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                      placeholder='Add a response option'
                      className='flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mr-2'
                    />
                    <button
                      onClick={handleAddOption}
                      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                      +
                    </button>
                  </div>
                </div>
              )
            default:
              return null
          }
        })()}

        <button
          onClick={handleAddQuestion}
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'
        >
          Add Question
        </button>
      </div>
      <button
        onClick={() => deleteSection(section.sectionId)}
        className='absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded focus:outline-none focus:shadow-outline'
        type='button'
      >
        Delete Section
      </button>
    </div>
  )
}

export default Section
