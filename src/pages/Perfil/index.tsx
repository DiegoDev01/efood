import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/hero.png'
import { DishCard } from '../../components/DishCard'
import { Footer } from '../../components/Footer'
import { Modal, ModalInner, ModalImageFixed, ModalTextArea, ModalParagraph, ModalPortion, ModalButton, Heading as ModalHeading } from '../../components/Modal'
import { fetchRestaurantById } from '../../services/api'
import type { Dish, Restaurant } from '../../types'

const HeaderProfile = styled.header`
  width: 100%;
  height: 186px;
  background-image: url(${bannerImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: auto;
    padding: 24px 0;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  
  a, span {
    font-weight: 900;
    font-size: 18px;
    color: ${(props) => props.theme.colors.primary};
    white-space: nowrap;
  }
  
  img {
    width: 125px;
    height: auto;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: center;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    
    a, span {
      font-size: 16px;
      white-space: normal;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 12px;

    a, span {
      font-size: 14px;
    }

    img {
      width: 100px;
    }
  }
`

const RestaurantBanner = styled.div<{ imageUrl: string }>`
  width: 100%;
  min-height: 320px;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.78) 100%),
    url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.colors.white};
  padding: 40px 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: auto;
    padding: 32px 16px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 28px 16px;
  }
`

const BannerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 40px;
  padding-left: 36px; /* alinhamento conforme Figma */

  span {
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.95;
    margin-bottom: 6px;
  }

  h2 {
    font-weight: 900;
    font-size: 48px;
    max-width: 720px;
    line-height: 1.05;
    margin: 0;
    text-shadow: 0 6px 22px rgba(0,0,0,0.45);
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding-top: 24px;
    padding-left: 24px;

    span {
      font-size: 12px;
    }

    h2 {
      font-size: 30px;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    span {
      font-size: 11px;
    }

    h2 {
      font-size: 22px;
    }
  }
`

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 32px;
  row-gap: 32px;
  margin-top: 80px;
  margin-bottom: 120px;

  @media (max-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    column-gap: 0;
    row-gap: 24px;
    margin-top: 56px;
    margin-bottom: 80px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    row-gap: 20px;
    margin-top: 40px;
    margin-bottom: 56px;
  }
`



export const Perfil = () => {
  const { id } = useParams()
  const restaurantId = Number(id)
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadRestaurant = async () => {
      if (!restaurantId) {
        setError('Restaurante inválido')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await fetchRestaurantById(restaurantId)
        if (!data) {
          setError('Restaurante não encontrado')
        }
        setRestaurant(data ?? null)
      } catch (err) {
        setError('Não foi possível carregar o restaurante. Tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    loadRestaurant()
  }, [restaurantId])

  useEffect(() => {
    if (!restaurant) return
    document.body.style.backgroundColor = '#FFF8F2'
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [restaurant])

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 16px' }}>
        <p>Carregando restaurante...</p>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="container" style={{ padding: '80px 16px' }}>
        <h2>{error ?? 'Restaurante não encontrado'}</h2>
        <p>Volte para a página inicial e selecione outro restaurante.</p>
        <Link to="/">Voltar</Link>
      </div>
    )
  }

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

      <RestaurantBanner imageUrl={restaurant.capa}>
        <div className="container" style={{ height: '100%' }}>
          <BannerContainer>
            <span>{restaurant.tipo}</span>
            <h2>{restaurant.titulo}</h2>
          </BannerContainer>
        </div>
      </RestaurantBanner>

      <main className="container">
        <MenuGrid>
          {restaurant.cardapio.map((item) => (
            <DishCard
              key={item.id}
              dish={item}
              onBuy={(dish) => setSelectedDish(dish)}
            />
          ))}
        </MenuGrid>

        <Modal
          open={Boolean(selectedDish)}
          onClose={() => setSelectedDish(null)}
        >
          {selectedDish && (
            <ModalInner>
              <ModalImageFixed src={selectedDish.foto} alt={selectedDish.nome} />
              <ModalTextArea>
                <ModalHeading>{selectedDish.nome}</ModalHeading>
                <ModalParagraph>{selectedDish.descricao}</ModalParagraph>
                <ModalPortion>Porção: {selectedDish.porcao}</ModalPortion>
                <div style={{ flex: 1 }} />
                <ModalButton onClick={() => { setSelectedDish(null); alert('Produto adicionado ao carrinho!') }}>
                  Adicionar ao carrinho - R$ {selectedDish.preco.toFixed(2).replace('.', ',')}
                </ModalButton>
              </ModalTextArea>
            </ModalInner>
          )}
        </Modal>
      </main>

      <Footer />
    </>
  )
}
