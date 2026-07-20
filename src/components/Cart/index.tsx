import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import trashIcon from '../../assets/trash.png'
import { clearCart } from '../../store/cartSlice'
import { checkoutOrder } from '../../services/api'
import type { Dish, CheckoutResponse } from '../../types'
import type { AppDispatch } from '../../store'

const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 360px;
  height: 100vh;
  background: #E66767;
  padding: 16px;
  box-shadow: -8px 0 24px rgba(0,0,0,0.12);
  z-index: 1200;
  overflow-y: auto;
  @media (max-width: 480px) {
    left: 0;
    right: 0;
    width: 100%;
    height: 60vh;
    bottom: 0;
    top: auto;
    padding: 12px;
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1150;
`

const CheckoutButton = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 12px;
  background: #FFEBD9;
  border: none;
  cursor: pointer;
  color: #E66767;
  border-radius: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    height: 48px;
    font-size: 16px;
  }
`

const SecondaryButton = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 12px;
  background: #FFEBD9;
  border: none;
  cursor: pointer;
  color: #E66767;
  border-radius: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    height: 48px;
    font-size: 16px;
  }
`

const SectionHeading = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 18px;
  color: #FFEBD9;
  margin-bottom: 24px;
`

const FieldLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #FFEBD9;
  margin-bottom: 8px;
`

const TextInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 8px 12px;
  background: #FFEBD9;
  border: none;
  border-radius: 0;
  color: #4B4B4B;
  font-size: 14px;
  margin-bottom: 16px;
  outline: none;

  &::placeholder {
    color: #4B4B4B;
    opacity: 0.6;
  }
`

const CardNumberInput = styled(TextInput)`
  width: 228px;
  height: 32px;
`

const CvvInput = styled(TextInput)`
  width: 87px;
  height: 32px;
`

const ExpiryInput = styled(TextInput)`
  width: 155px;
  height: 32px;
`

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const Product = styled.div`
  width: 344px;
  height: 100px;
  background: #FFEBD9;
  display: flex;
  gap: 12px;
  padding: 8px;
  align-items: center;
  border-radius: 0;
  margin-bottom: 12px;
  position: relative;
  @media (max-width: 480px) {
    width: 100%;
    height: auto;
    padding: 12px;
    flex-direction: row;
  }
`

const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  @media (max-width: 480px) {
    width: 64px;
    height: 64px;
  }
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
  color: #E66767;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const ProductPrice = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #E66767;
  margin-top: 6px;
  @media (max-width: 480px) {
    font-size: 14px;
    margin-top: 4px;
  }
`

const Trash = styled.button`
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  padding: 0;
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 480px) {
    right: 8px;
    bottom: 8px;
  }
`

const TotalRow = styled.div`
  width: 344px;
  margin-top: 12px;
  display:flex;
  justify-content: space-between;
  align-items:center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  background: transparent;
  padding: 8px 0;
  border-radius: 0;
  color: #FFEBD9;
`

function formatPrice(value: number | undefined | null): string {
  const num = Number(value ?? 0)
  return `R$ ${num.toFixed(2).replace('.', ',')}`
}

function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

function validateZipCode(value: string): boolean {
  return onlyDigits(value).length === 8
}

function validateCardNumber(value: string): boolean {
  return onlyDigits(value).length === 16
}

function validateCvv(value: string): boolean {
  return onlyDigits(value).length === 3
}

function validateMonth(value: string): boolean {
  const month = Number(onlyDigits(value))
  return month >= 1 && month <= 12 && onlyDigits(value).length === 2
}

function validateYear(value: string): boolean {
  return onlyDigits(value).length === 4
}

type Props = {
  items: Dish[]
  onRemove: (id: number) => void
  open?: boolean
  onClose?: () => void
}

export const Cart = ({ items, onRemove, open = true, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [step, setStep] = useState<'cart' | 'delivery' | 'payment' | 'confirmation'>('cart')
  const [receiver, setReceiver] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardCode, setCardCode] = useState('')
  const [cardMonth, setCardMonth] = useState('')
  const [cardYear, setCardYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<CheckoutResponse | null>(null)

  useEffect(() => {
    if (!open) {
      setStep('cart')
      setReceiver('')
      setAddress('')
      setCity('')
      setZipCode('')
      setNumber('')
      setComplement('')
      setCardName('')
      setCardNumber('')
      setCardCode('')
      setCardMonth('')
      setCardYear('')
      setLoading(false)
      setError('')
      setOrder(null)
    }
  }, [open])

  useEffect(() => {
    setError('')
  }, [step])

  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.preco ?? 0), 0), [items])
  const formattedTotal = formatPrice(total)

  const isDeliveryValid = receiver.trim() && address.trim() && city.trim() && validateZipCode(zipCode) && number.trim()
  const isPaymentValid = cardName.trim() && validateCardNumber(cardNumber) && validateCvv(cardCode) && validateMonth(cardMonth) && validateYear(cardYear)

  const handleConfirmPayment = async () => {
    if (!isPaymentValid || !isDeliveryValid) {
      setError('Preencha todos os campos obrigatórios para concluir o pedido.')
      return
    }

    if (items.length === 0) {
      setError('Adicione itens ao carrinho antes de finalizar o pedido.')
      return
    }

    setLoading(true)
    setError('')

    const payload = {
      products: items.map((item) => ({ id: item.id, price: Number(item.preco ?? 0) })),
      delivery: {
        receiver: receiver.trim(),
        address: {
          description: address.trim(),
          city: city.trim(),
          zipCode: zipCode.trim(),
          number: Number(number),
          complement: complement.trim() || undefined,
        },
      },
      payment: {
        card: {
          name: cardName.trim(),
          number: cardNumber.replace(/\s+/g, ''),
          code: Number(cardCode),
          expires: {
            month: Number(cardMonth),
            year: Number(cardYear),
          },
        },
      },
    }

    try {
      const response = await checkoutOrder(payload)
      setOrder(response)
      setStep('confirmation')
      dispatch(clearCart())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao finalizar o pagamento.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeliveryContinue = () => {
    if (!isDeliveryValid) {
      setError('Preencha todos os campos obrigatórios para concluir o pedido.')
      return
    }

    setError('')
    setStep('payment')
  }

  const handleClose = () => {
    onClose?.()
  }

  return (
    <>
      {open && <Overlay onClick={handleClose} />}
      <Sidebar style={{ display: open ? 'block' : 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
          <div style={{ width: 344, maxWidth: '100%' }}>
            {step === 'cart' && (
              <>
                <SectionHeading>Carrinho</SectionHeading>
                {items.length === 0 ? (
                  <p style={{ color: '#FFEBD9', marginTop: 0 }}>Seu carrinho está vazio.</p>
                ) : (
                  <>
                    {items.map((item) => (
                      <Product key={item.id}>
                        <Thumb src={item.foto} alt={item.nome} />
                        <ProductInfo>
                          <ProductTitle>{item.nome}</ProductTitle>
                          <ProductPrice>{formatPrice(item.preco)}</ProductPrice>
                        </ProductInfo>
                        <Trash onClick={() => onRemove?.(item.id)}>
                          <img src={trashIcon} alt="remover" style={{ width: 16, height: 16 }} />
                        </Trash>
                      </Product>
                    ))}
                    <TotalRow>
                      <div>Total</div>
                      <div>{formattedTotal}</div>
                    </TotalRow>
                  </>
                )}
                <CheckoutButton type="button" onClick={() => setStep('delivery')}>Continuar com a entrega</CheckoutButton>
              </>
            )}

            {step === 'delivery' && (
              <>
                <SectionHeading>Entrega</SectionHeading>
                <FieldLabel htmlFor="receiver">Quem irá receber</FieldLabel>
                <TextInput id="receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} placeholder="Nome completo" />
                <FieldLabel htmlFor="address">Endereço</FieldLabel>
                <TextInput id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Rua, bairro, etc." />
                <FieldLabel htmlFor="city">Cidade</FieldLabel>
                <TextInput id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cidade" />
                <GridRow>
                  <div>
                    <FieldLabel htmlFor="zipCode">CEP</FieldLabel>
                    <TextInput
                      id="zipCode"
                      value={zipCode}
                      onChange={(e) => setZipCode(onlyDigits(e.target.value).slice(0, 8))}
                      placeholder="00000-000"
                      maxLength={8}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="number">Número</FieldLabel>
                    <TextInput
                      id="number"
                      value={number}
                      onChange={(e) => setNumber(onlyDigits(e.target.value))}
                      placeholder="Número"
                      inputMode="numeric"
                    />
                  </div>
                </GridRow>
                <FieldLabel htmlFor="complement">Complemento (opcional)</FieldLabel>
                <TextInput id="complement" value={complement} onChange={(e) => setComplement(e.target.value)} placeholder="Apto, bloco, etc." />
                {error && <p style={{ color: '#FFEBD9', marginTop: 0 }}>{error}</p>}
                <CheckoutButton type="button" onClick={handleDeliveryContinue}>
                  Continuar com o pagamento
                </CheckoutButton>
                <SecondaryButton type="button" onClick={() => setStep('cart')}>
                  Voltar para o carrinho
                </SecondaryButton>
              </>
            )}

            {step === 'payment' && (
              <>
                <SectionHeading>Pagamento - Valor a pagar {formattedTotal}</SectionHeading>
                <FieldLabel htmlFor="cardName">Nome no cartão</FieldLabel>
                <TextInput id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Nome do titular" />
                <GridRow>
                  <div>
                    <FieldLabel htmlFor="cardNumber">Número do cartão</FieldLabel>
                    <CardNumberInput
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(onlyDigits(e.target.value).slice(0, 16))}
                      placeholder="0000 0000 0000 0000"
                      maxLength={16}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="cardCode">CVV</FieldLabel>
                    <CvvInput
                      id="cardCode"
                      value={cardCode}
                      onChange={(e) => setCardCode(onlyDigits(e.target.value).slice(0, 3))}
                      placeholder="123"
                      maxLength={3}
                      inputMode="numeric"
                    />
                  </div>
                </GridRow>
                <GridRow>
                  <div>
                    <FieldLabel htmlFor="cardMonth">Mês de vencimento</FieldLabel>
                    <ExpiryInput
                      id="cardMonth"
                      value={cardMonth}
                      onChange={(e) => setCardMonth(onlyDigits(e.target.value).slice(0, 2))}
                      placeholder="MM"
                      maxLength={2}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <FieldLabel htmlFor="cardYear">Ano de vencimento</FieldLabel>
                    <ExpiryInput
                      id="cardYear"
                      value={cardYear}
                      onChange={(e) => setCardYear(onlyDigits(e.target.value).slice(0, 4))}
                      placeholder="AAAA"
                      maxLength={4}
                      inputMode="numeric"
                    />
                  </div>
                </GridRow>
                {error && <p style={{ color: '#FFEBD9', marginTop: 0 }}>{error}</p>}
                <CheckoutButton type="button" onClick={handleConfirmPayment} disabled={loading}>
                  {loading ? 'Finalizando...' : 'Finalizar pagamento'}
                </CheckoutButton>
                <SecondaryButton type="button" onClick={() => setStep('delivery')}>
                  Voltar para a edição de endereço
                </SecondaryButton>
              </>
            )}

            {step === 'confirmation' && (
              <>
<SectionHeading>Pedido realizado - {order?.orderId ?? ''}</SectionHeading>
                <p style={{ color: '#FFEBD9', marginTop: 0, lineHeight: '1.6' }}>
                  Estamos felizes em informar que seu pedido já está em processo de preparação e, em breve, será entregue no endereço fornecido.
                </p>
                <p style={{ color: '#FFEBD9', marginTop: 16, lineHeight: '1.6' }}>
                  Gostaríamos de ressaltar que nossos entregadores não estão autorizados a realizar cobranças extras.
                </p>
                <p style={{ color: '#FFEBD9', marginTop: 16, lineHeight: '1.6' }}>
                  Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
                </p>
                <p style={{ color: '#FFEBD9', marginTop: 16, lineHeight: '1.6' }}>
                  Esperamos que desfrute de uma deliciosa e agradável experiência gastronômica. Bom apetite!
                </p>
                <CheckoutButton type="button" onClick={handleClose}>
                  Concluir
                </CheckoutButton>
              </>
            )}
          </div>
        </div>
      </Sidebar>
    </>
  )
}