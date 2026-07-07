import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/hero.png'
import { DishCard } from '../../components/DishCard'
import { Footer } from '../../components/Footer'
import { Modal } from '../../components/Modal'
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
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%),
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
  gap: 14px;

  span {
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.9;
  }

  h2 {
    font-weight: 900;
    font-size: 42px;
    max-width: 620px;
    line-height: 1.05;
  }

  p {
    max-width: 650px;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 8px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
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
      font-size: 24px;
    }
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
            <p>{restaurant.descricao}</p>
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
          title={selectedDish?.nome}
          onClose={() => setSelectedDish(null)}
        >
          {selectedDish && (
            <div>
              <img
                src={selectedDish.foto}
                alt={selectedDish.nome}
                style={{ width: '100%', borderRadius: '16px', marginBottom: '20px' }}
              />
              <p style={{ marginBottom: '12px' }}>{selectedDish.descricao}</p>
              <p style={{ fontWeight: 700, marginBottom: '4px' }}>
                Porção: {selectedDish.porcao}
              </p>
              <p style={{ fontWeight: 700, marginBottom: '20px' }}>
                Preço: R$ {selectedDish.preco.toFixed(2).replace('.', ',')}
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setSelectedDish(null)
                  alert('Compra realizada com sucesso!')
                }}
              >
                <label style={{ display: 'block', marginBottom: '12px' }}>
                  Nome completo
                  <input
                    required
                    type="text"
                    style={{ width: '100%', marginTop: '8px', padding: '10px', borderRadius: '12px', border: '1px solid #EEE' }}
                    placeholder="Seu nome"
                  />
                </label>
                <label style={{ display: 'block', marginBottom: '12px' }}>
                  Endereço de entrega
                  <input
                    required
                    type="text"
                    style={{ width: '100%', marginTop: '8px', padding: '10px', borderRadius: '12px', border: '1px solid #EEE' }}
                    placeholder="Rua, número, bairro"
                  />
                </label>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px 0',
                    borderRadius: '14px',
                    border: 'none',
                    backgroundColor: '#E66767',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Confirmar compra
                </button>
              </form>
            </div>
          )}
        </Modal>
      </main>

      <Footer />
    </>
  )
}
