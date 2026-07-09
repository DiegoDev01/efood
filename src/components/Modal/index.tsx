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
  width: min(1024px, 90%);
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
  position: relative;
  max-height: calc(100vh - 48px);
  overflow-y: auto;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 16px;
    border-radius: 12px;
  }
`

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: grid;
  place-items: center;
`

const Heading = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.colors.white};
  margin: 0 0 20px;
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
