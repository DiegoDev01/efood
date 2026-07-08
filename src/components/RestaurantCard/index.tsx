// src/components/RestaurantCard/index.tsx
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import type { Restaurant } from '../../types'

type CardProps = { restaurant: Restaurant }

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.primary};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(230, 103, 103, 0.08);
`

const RestaurantImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 200px;
  }
`

const InfoContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 14px;
  }
`

const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h3 {
    font-weight: 700;
    font-size: 18px;
    color: ${(props) => props.theme.colors.primary};
    margin: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};

  img {
    width: 21px;
    height: 21px;
  }
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.primary};
  margin: 0 0 16px;
  flex-grow: 1;
`

const ButtonLink = styled(Link)`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 700;
  font-size: 14px;
  padding: 10px 12px;
  text-align: center;
  align-self: flex-start;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    align-self: stretch;
  }
`

const TagsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    position: static;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 12px 16px 0;
  }
`

const Tag = styled.span`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
  font-weight: 700;
  padding: 6px 8px;
  display: inline-block;
`

export const RestaurantCard = ({ restaurant }: CardProps) => {
    return (
        <CardContainer>
            {/* MAPEADO COM OS CAMPOS EM PORTUGUÊS DA API */}
            <RestaurantImage src={restaurant.capa} alt={restaurant.titulo} />

            <TagsContainer>
                {/* Confere se 'destacado' é true para renderizar o Destaque da Semana */}
                {restaurant.destacado && <Tag>Destaque da semana</Tag>}
                <Tag>{restaurant.tipo}</Tag>
            </TagsContainer>

            <InfoContainer>
                <HeaderCard>
                    <h3>{restaurant.titulo}</h3>
                    <Rating>
                        <span>{restaurant.avaliacao}</span>
                        ⭐
                    </Rating>
                </HeaderCard>

                <Description>
                    {restaurant.descricao}
                </Description>
                <ButtonLink to={`/perfil/${restaurant.id}`}>Saiba mais</ButtonLink>
            </InfoContainer>
        </CardContainer>
    )
}