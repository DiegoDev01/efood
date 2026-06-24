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
    `

const RestaurantImage = styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
    `

const InfoContainer = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    `

const HeaderCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    h3 {
        font-weight: 700;
        font-size: 18px;
        color: ${(props) => props.theme.colors.primary};
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
    margin-bottom: 16px;
    flex-grow: 1;
    `

const ButtonLink = styled(Link)`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    font-weight: 700;
    font-size: 14px;
    padding: 4px 6px;
    text-align: center;
    align-self: flex-start;
    display: inline-block;
    cursor: pointer;
    `

const TagsContainer = styled.div`
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    gap: 8px;

    `
const Tag = styled.span`
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.secondary};
    font-size: 12px;
    font-weight: 700;
    padding: 6px 4px;
    display: inline-block;
    `

export const RestaurantCard = ({ restaurant }: CardProps) => {
    return (
        <CardContainer>
            <RestaurantImage src={restaurant.image} alt={restaurant.title} />

            <TagsContainer>
                {/* Só exibe a tag de Destaque se o atributo featured for verdadeiro */}
                {restaurant.featured && <Tag>Destaque do dia</Tag>}
                <Tag>{restaurant.category}</Tag>
            </TagsContainer>

            <InfoContainer>
                <HeaderCard>
                    <h3>{restaurant.title}</h3>
                    <Rating>
                            <span>{restaurant.rating}</span>
                            ⭐
                        </Rating>
                </HeaderCard>

                <Description>
                    {restaurant.description}
                </Description>
                <ButtonLink to={`/perfil/${restaurant.id}`}>Saiba mais</ButtonLink>
            </InfoContainer>
        </CardContainer>
    )
}