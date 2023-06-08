import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Admin from './components/Admin'
import User from './components/User'
import CreateSurveyForm from './components/CreateSurveyForm'
import SurveyList from './components/SurveyList'
import SurveyPage from './components/SurveyPage'
import Preview from './components/Preview'

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/admin' element={<Admin />} />
          <Route path='/user' element={<User />} />
          <Route path='/create-survey' element={<CreateSurveyForm />} />
          <Route path='/surveys' element={<SurveyList />} />
          <Route path='/survey/:surveyId' element={<SurveyPage />} />
          <Route path='/preview' element={<Preview />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
