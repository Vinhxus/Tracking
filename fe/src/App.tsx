import CreatePage from './routes/CreatePage'
import { Route, Routes } from 'react-router-dom'
import Activities from './routes/Activities'
import { ActivityProvider } from '../src/components/ActivityContext'

function App() {
  return (
    <ActivityProvider>
      <Routes>
        <Route path="/" element={<Activities />} />
        <Route path="/create" element={<CreatePage />} />
        <Route
          path="*"
          element={<div className="p-4 text-center">404 - Page not exist</div>}
        />
      </Routes>
    </ActivityProvider>
  )
}

export default App