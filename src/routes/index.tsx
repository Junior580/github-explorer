import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Repository from '../pages/Repository'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/repository" Component={Repository} />
    </Routes>
  )
}

export default AppRoutes
