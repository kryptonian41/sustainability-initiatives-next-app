import { Container } from 'components/Container'
import { Header } from 'components/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Container>
        <Header />
      </Container>

      <div className="p-20 bg-red-400"></div>
    </div>
  )
}
