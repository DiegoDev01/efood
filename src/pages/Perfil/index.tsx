import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/hero.png'
import { DishCard } from '../../components/DishCard'
import { Footer } from '../../components/Footer'
import { Modal, ModalInner, ModalImageFixed, ModalTextArea, ModalParagraph, ModalPortion, ModalButton, Heading as ModalHeading } from '../../components/Modal'
import { Cart } from '../../components/Cart'
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
  height: 280px;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.78) 100%),
    url(${(props) => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.colors.white};
  padding: 0;
  position: relative;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: 240px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 220px;
  }
`

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 280px;

  span {
    position: absolute;
    top: 25px;
    left: 0;
    width: 101px;
    height: 33.25px;
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    font-style: normal;
    font-size: 32px;
    line-height: 33.25px;
    letter-spacing: 0;
    margin: 0;
    opacity: 1;
    white-space: nowrap;
  }

  h2 {
    position: absolute;
    top: 215px;
    left: 0;
    width: 676px;
    height: 33.25px;
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    font-style: normal;
    font-size: 32px;
    line-height: 33.25px;
    letter-spacing: 0;
    margin: 0;
    text-shadow: none;
    white-space: nowrap;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 240px;

    span {
      top: 24px;
      left: 24px;
      font-size: 24px;
      width: auto;
    }

    h2 {
      top: 64px;
      left: 24px;
      width: min(92%, 560px);
      font-size: 24px;
      white-space: normal;
      line-height: 1.1;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 220px;

    span {
      top: 20px;
      left: 16px;
      font-size: 18px;
    }

    h2 {
      top: 54px;
      left: 16px;
      width: min(92%, 320px);
      font-size: 20px;
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
  const [cartItems, setCartItems] = useState<Dish[]>([])
  const [cartOpen, setCartOpen] = useState(false)
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
            <span role="button" onClick={() => setCartOpen(true)} style={{cursor: 'pointer'}}>{cartItems.length} produto(s) no carrinho</span>
          </HeaderContainer>
        </div>
      </HeaderProfile>

      <RestaurantBanner imageUrl={restaurant.capa}>
        <div className="container" style={{ height: '100%', position: 'relative' }}>
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

        <Cart open={cartOpen} items={cartItems} onRemove={(id) => {
          // remove only the first occurrence of the item with this id
          setCartItems((prev) => {
            const index = prev.findIndex((p) => p.id === id)
            if (index === -1) return prev
            const copy = [...prev]
            copy.splice(index, 1)
            return copy
          })
        }} onClose={() => setCartOpen(false)} />

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
                <ModalButton onClick={() => {
                  // add to cart
                  setCartItems((prev) => [...prev, selectedDish])
                  setSelectedDish(null)
                }}>
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
