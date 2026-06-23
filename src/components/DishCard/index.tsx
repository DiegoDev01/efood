import styled from 'styled-components'
import type { Dish } from '../../types'

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 8px;
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
`

const DishImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  margin-bottom: 8px;
`

const Title = styled.h3`
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 8px;
`

const Description = styled.p`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
  flex-grow: 1; /* Garante que o botão fique sempre alinhado na parte de baixo */
`

const AddButton = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  border: none;
  font-weight: 700;
  font-size: 14px;
  padding: 4px 0;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

type DishCardProps = Dish & {
  onAdd?: () => void
}

export const DishCard = ({
  image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
  title = 'Pizza Margherita',
  description = 'A clássica pizza italiana com molho de tomate artesanal, muçarela de búfala fresca, manjericão e um fio de azeite extra virgem.',
  onAdd,
}: DishCardProps) => {
    return (
        <CardContainer>
            <DishImage src={image} alt={title} />
            <Title>{title}</Title>
            <Description>{description}</Description>
            <AddButton type="button" onClick={onAdd}>{'Adicionar ao carrinho'}</AddButton>
        </CardContainer>
    )
}