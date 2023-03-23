import { Title, Form } from './style'
import logoImg from '../../assets/logo.svg'

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImg} alt="github explorer" />
      <Title>Explore repositórios no Github</Title>
      <Form>
        <input type="text" placeholder="Digite aqui o nome do repisitório" />
        <button type="submit">Pesquisar</button>
      </Form>
    </>
  )
}
export default Dashboard
