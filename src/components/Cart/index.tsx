import React from 'react'
import styled from 'styled-components'
import trashIcon from '../../assets/trash.png'
import type { Dish } from '../../types'

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px; /* especificado */
  height: 100vh;
  background: #E66767; /* cor de fundo solicitada */
  padding: 16px;
  box-shadow: -8px 0 24px rgba(0,0,0,0.12);
  z-index: 1200;
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45); /* sobreposição sem desfoque */
  z-index: 1150;
`

const Product = styled.div`
  width: 344px;
  height: 100px;
  background: #FFEBD9; /* conforme especificado */
  display: flex;
  gap: 12px;
  padding: 8px;
  align-items: center;
  border-radius: 0; /* sem arredondamento */
  margin-bottom: 12px;
  position: relative;
`

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const ProductTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  text-align: left;
  color: #E66767; /* cor das fontes */
`

const ProductPrice = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #E66767; /* cor das fontes */
  margin-top: 6px;
`

const Trash = styled.button`
  width: 16px;
  height: 16px;
  background: transparent; /* ícone sem fundo */
  border: none;
  padding: 0;
  position: absolute;
  right: 8px;
  bottom: 8px; /* canto inferior direito */
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const TotalRow = styled.div`
  width: 344px;
  margin-top: 60px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  background: transparent; /* manter sem fundo */
  padding: 0 0 8px 0;
  border-radius: 0;
  color: #FFEBD9; /* cor do texto conforme especificado */
`

const CheckoutButton = styled.button`
  width: 344px;
  height: 24px;
  margin-top: 12px;
  background: #FFEBD9; /* conforme especificado */
  border: none;
  cursor: pointer;
  color: #E66767;
  border-radius: 0; /* sem arredondamento */
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px; /* 100% de 14px */
  letter-spacing: 0;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

type Props = {
  items: Dish[]
  onRemove: (id: number) => void
  open?: boolean
  onClose?: () => void
}

export const Cart: React.FC<Props> = ({ items, onRemove, open = true, onClose }) => {
  if (!open) return null
  const total = items.reduce((s, i) => s + (i.preco ?? 0), 0)

  return (
    <>
      <Overlay onClick={onClose} />
      <Sidebar>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div style={{width:344}}>
          {items.map((it, idx) => (
            <Product key={idx}>
              <Thumb src={it.foto} alt={it.nome} />
              <ProductInfo>
                <ProductTitle>{it.nome}</ProductTitle>
                <ProductPrice>R$ {it.preco?.toFixed(2).replace('.',',')}</ProductPrice>
              </ProductInfo>
              <Trash aria-label="remover" onClick={() => onRemove(it.id)}>
                <img src={trashIcon} alt="remover" style={{width:16,height:16}}/>
              </Trash>
            </Product>
          ))}

          <TotalRow>
            <div>Valor total</div>
            <div>R$ {total.toFixed(2).replace('.',',')}</div>
          </TotalRow>

          <CheckoutButton>Continuar com a entrega</CheckoutButton>
        </div>
      </div>
      </Sidebar>
    </>
  )
}
