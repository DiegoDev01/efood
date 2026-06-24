import styled from 'styled-components'
import bannerImg from '../../assets/hero.png'
import logoImg from '../../assets/logo.png'
import { RestaurantCard } from '../../components/RestaurantCard'
import { Footer } from '../../components/Footer' 
import { restaurantsMock } from './data'

const HeroBanner = styled.div`
  width: 100%;
  height: 384px;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 64px 0 40px 0;
  text-align: center;
  margin-bottom: 80px;
`

const LogoContainer = styled.div`
  img {
    width: 125px;
    height: auto;
  }
`

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 36px;
  line-height: 100%;
  max-width: 539px;
  width: 100%;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
`

const RestaurantsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 80px;
  row-gap: 48px;

  /* 2. ADICIONADO O '@' QUE FALTAVA AQUI: */
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    row-gap: 32px;  
  }
`

export const Home = () => {
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
                <RestaurantsGrid>
                    {restaurantsMock.map((item) => (
                        <RestaurantCard key={item.id} restaurant={item} />
                    ))}
                </RestaurantsGrid>
            </main>
            <Footer />
        </>
    )
}