// src/components/DishCard/index.tsx
import styled from 'styled-components'
import type { Dish } from '../../types'

const CardContainer = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 12px;
  color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px;
  }
`

const DishImage = styled.img`
  width: 100%;
  height: 167px;
  object-fit: cover;
  margin-bottom: 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 140px;
  }
`

const Title = styled.h3`
  font-weight: 900;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 8px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 15px;
  }
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
  padding: 10px 0;
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`

// Tipagem corrigida: Recebe o objeto completo 'dish' da API e a função para abrir o Modal
type DishCardProps = {
  dish: Dish
  onBuy: (dish: Dish) => void
}

export const DishCard = ({ dish, onBuy }: DishCardProps) => {
  // Encurta a descrição para não quebrar o tamanho fixo dos cards na grade
  const getShortDescription = (text: string) => {
    if (text.length > 130) {
      return text.slice(0, 130) + '...'
    }
    return text
  }

  return (
    <CardContainer>
      {/* Dados mapeados em português direto do objeto da API */}
      <DishImage src={dish.foto} alt={dish.nome} />
      <Title>{dish.nome}</Title>
      <Description>{getShortDescription(dish.descricao)}</Description>

      {/* Ao clicar, dispara o modal enviando o prato selecionado */}
      <AddButton type="button" onClick={() => onBuy(dish)}>
        Comprar o produto
      </AddButton>
    </CardContainer>
  )
}