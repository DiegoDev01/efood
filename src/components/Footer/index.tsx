import styled from 'styled-components'
import logoImg from '../../assets/logo.png'

import instagramIcon from '../../assets/instagram.png'
import facebookIcon from '../../assets/facebook.png'
import twitterIcon from '../../assets/twitter.png'

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 40px 0;
  text-align: center;
  width: 100%;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 16px;
  }
`

const Logo = styled.img`
  width: 125px;
  height: auto;
  margin-bottom: 32px;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100px;
    margin-bottom: 24px;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 80px;

  a {
    display: inline-block;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  img {
    width: 24px;
    height: 24px;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: 40px;

    img {
      width: 20px;
      height: 20px;
    }
  }
`

const Disclaimer = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 10px;
  line-height: 100%;
  max-width: 480px;
  width: 100%;
  text-align: center;
  color: #E66767; /* Cor bege claro exata do Figma */
  opacity: 1;

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 9px;
    padding: 0 8px;
  }
`

export const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <Logo src={logoImg} alt="efood" />
          <SocialLinks>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </SocialLinks>
          <Disclaimer>
            A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
          </Disclaimer>
        </FooterContent>
      </div>
    </FooterContainer>
  )
}