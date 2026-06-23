// src/pages/Perfil/index.tsx
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/hero.png'
import { DishCard } from '../../components/DishCard'
import { Footer } from '../../components/Footer' // 1. IMPORTADO O FOOTER AQUI TAMBÉM

const HeaderProfile = styled.header`
  width: 100%;
  height: 186px;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  a, span {
    font-weight: 900;
    font-size: 18px;
    color: ${(props) => props.theme.colors.primary};
  }
  
  img {
    width: 125px;
    height: auto;
  }
`

const RestaurantBanner = styled.div`
  width: 100%;
  height: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                    url('https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.colors.white};
  padding: 32px 0;
`

const BannerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    font-weight: 100;
    font-size: 32px;
    opacity: 0.8;
  }

  h2 {
    font-weight: 900;
    font-size: 32px;
  }
`

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  row-gap: 32px;
  margin-top: 80px;
  margin-bottom: 120px;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`

export const Perfil = () => {
    return (
        <>
            <HeaderProfile>
                <div className="container" style={{ width: '100%' }}>
                    <HeaderContainer>
                        <Link to="/">Restaurantes</Link>
                        <img src={logoImg} alt="efood" />
                        <span>0 produto(s) no carrinho</span>
                    </HeaderContainer>
                </div>
            </HeaderProfile>

            <RestaurantBanner>
                <div className="container" style={{ height: '100%' }}>
                    <BannerContainer>
                        <span>Italiana</span>
                        <h2>La Dolce Vita Trattoria</h2>
                    </BannerContainer>
                </div>
            </RestaurantBanner>

            <main className="container">
                <MenuGrid>
                    <DishCard />
                    <DishCard />
                    <DishCard />
                    <DishCard />
                    <DishCard />
                    <DishCard />
                </MenuGrid>
            </main>

            {/* 2. ADICIONADO NO FINAL DO PERFIL */}
            <Footer />
        </>
    )
}