import { useEffect, useState } from 'react'
import { useResolvedPath, Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import { Header, RepositoryInfo, Issues } from './styles'

interface IRepository {
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  owner: {
    login: string
    avatar_url: string
  }
}

interface Issue {
  id: number
  title: string
  html_url: string
  user: {
    login: string
  }
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<IRepository | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])

  const { pathname } = useResolvedPath('')
  const pathUrl = pathname.split('/repositories/')[1]

  useEffect(() => {
    api.get(`repos/${pathUrl}`).then(response => {
      setRepository(response.data)
    })

    api.get(`repos/${pathUrl}/issues`).then(response => {
      setIssues(response.data)
    })
  }, [pathname])

  return (
    <>
      <Header>
        <img src={logoImg} alt="github explorer" />
        <Link to={'/'}>
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repository ? (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Inssues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>carregando</p>
      )}

      <Issues>
        {issues.map(issue => (
          <Link key={issue.id} to={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Issues>
    </>
  )
}
export default Repository
