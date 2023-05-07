import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'

import GlobalStyle from './styles/global'

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <GlobalStyle />
  </>
)

export default App
