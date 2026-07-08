import { useEffect, useState } from 'react'
import styled from 'styled-components'
import bannerImg from '../../assets/hero.png'
import logoImg from '../../assets/logo.png'
import { RestaurantCard } from '../../components/RestaurantCard'
import { Footer } from '../../components/Footer'
import { fetchRestaurants } from '../../services/api'
import type { Restaurant } from '../../types'

const HeroBanner = styled.div`
  width: 100%;
  min-height: 384px;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 64px 24px 40px;
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: auto;
    padding: 48px 24px 32px;
    margin-bottom: 56px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 40px 16px 24px;
    margin-bottom: 40px;
  }
`

const LogoContainer = styled.div`
  img {
    width: 125px;
    height: auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    img {
      width: 100px;
    }
  }
`

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 1.1;
  max-width: 539px;
  width: min(100%, 539px);
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: 30px;
    max-width: 420px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 24px;
    max-width: 320px;
  }
`

const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 80px;
  row-gap: 48px;
  align-items: start;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    column-gap: 48px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 32px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    row-gap: 24px;
  }
`

export const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchRestaurants()
        setRestaurants(data)
      } catch (err) {
        setError('Não foi possível carregar os restaurantes. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [])

  return (
    <>
      <HeroBanner>
        <LogoContainer>
          <img src={logoImg} alt="efood" />
        </LogoContainer>

        <Title>
          Viva experiências gastronômicas no conforto da sua casa
        </Title>
      </HeroBanner>

      <main className="container">
        {loading ? (
          <p>Carregando restaurantes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <RestaurantsGrid>
            {restaurants.map((item) => (
              <RestaurantCard key={item.id} restaurant={item} />
            ))}
          </RestaurantsGrid>
        )}
      </main>
      <Footer />
    </>
  )
}