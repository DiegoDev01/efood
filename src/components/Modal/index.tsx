import type { ReactNode } from 'react'
import styled from 'styled-components'

type ModalProps = {
    open: boolean
    title?: string
    children: ReactNode
    onClose: () => void
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
`

const Dialog = styled.div`
  width: 1024px;
  max-width: calc(100% - 48px);
  height: 344px; /* conforme Figma */
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: 32px 36px 32px 36px; /* topo/padding interno para posicionamentos */
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
  position: relative;
  overflow: hidden;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: min(92%, 720px);
    height: auto;
    padding: 20px;
    border-radius: 12px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  display: grid;
  place-items: center;
`

export const Heading = styled.h2`
  font-size: 22px;
  color: ${(props) => props.theme.colors.white};
  margin: 0 0 12px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
`

export const ModalInner = styled.div`
  display: grid;
  grid-template-columns: 280px 656px; /* imagem e área de texto conforme Figma */
  gap: 24px;
  align-items: start;
  height: 100%;
`

export const ModalImageFixed = styled.img`
  width: 280px;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  box-shadow: 0 6px 18px rgba(0,0,0,0.28);
`

export const ModalTextArea = styled.div`
  width: 656px;
  height: 176px; /* altura da área de texto conforme Figma */
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ModalParagraph = styled.p`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(255,255,255,0.95);
`

export const ModalPortion = styled(ModalParagraph)`
  /* 'Porção' uses same typography as product description */
  font-weight: 700;
  color: rgba(255,255,255,0.95);
`

export const ModalButtonWrapper = styled.div`
  margin-top: 12px;
`

export const ModalButton = styled.button`
  width: 218px;
  height: 24px;
  line-height: 22px;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 6px;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
`

export const Modal = ({ open, title, children, onClose }: ModalProps) => {
  if (!open) return null

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <CloseButton type="button" onClick={onClose} aria-label="Fechar modal">
          ×
        </CloseButton>
        {title && <Heading>{title}</Heading>}
        {children}
      </Dialog>
    </Overlay>
  )
}
