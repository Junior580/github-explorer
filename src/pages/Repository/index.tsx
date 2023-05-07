import { useResolvedPath } from 'react-router-dom'

interface IRepositoryParams {
  repository: string
}

const Repository: React.FC = () => {
  const { pathname } = useResolvedPath('')
  return (
    <>
      <h1>Repository:{pathname}</h1>
    </>
  )
}
export default Repository
