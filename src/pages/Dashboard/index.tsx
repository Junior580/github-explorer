import { useState, FormEvent, useCallback, useEffect } from 'react'
import { Title, Form, Repositories, Error } from './style'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

interface IRepository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [inputError, setInputError] = useState('')
  const [repositories, setRepositories] = useState<IRepository[]>([])

  useEffect(() => {
    localStorage.setItem(
      '@GihubExplorer:repositories',
      JSON.stringify(repositories),
    )
  }, [repositories])

  const handleAddRepository = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()

    if (!newRepo) {
      setInputError('Digite autor/nome do repositório')
      return
    }

    try {
      const response = await api.get<IRepository>(`repos/${newRepo}`)

      const repository = response.data

      setRepositories([...repositories, repository])

      setNewRepo('')

      setInputError('')
    } catch (error) {
      setInputError('Erro na busca por esse repositório')
    }
  }

  return (
    <>
      <img src={logoImg} alt="github explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite aqui o nome do repisitório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <a key={repository.full_name} href="/">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
}
export default Dashboard
