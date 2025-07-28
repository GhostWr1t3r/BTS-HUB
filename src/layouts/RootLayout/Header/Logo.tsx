import Link from "next/link"
import { CONFIG } from "site.config"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

const clipIn = keyframes`
  0% { clip-path: inset(0 100% 0 0); }
  100% { clip-path: inset(0 0 0 0); }
`

const glitchEffect = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`

const Logo = () => {
  const title = CONFIG.blog.title
  const splitIndex = title.toLowerCase().indexOf('hub')
  const firstPart = title.slice(0, splitIndex)
  const hubPart = title.slice(splitIndex, splitIndex + 3)
  const lastPart = title.slice(splitIndex + 3)

  return (
    <StyledWrapper href="/" aria-label={CONFIG.blog.title}>
      <LogoContainer>
        <MainText data-text={firstPart}>{firstPart}</MainText>
        <HubText data-text={hubPart}>{hubPart}</HubText>
        <LastText data-text={lastPart}>{lastPart}</LastText>
        <GlitchLine />
      </LogoContainer>
    </StyledWrapper>
  )
}

export default Logo

const StyledWrapper = styled(Link)`
  text-decoration: none;
  display: inline-block;
  position: relative;
  padding: 0.75em 1.5em;
  
  &:hover {
    MainText, HubText, LastText {
      animation: ${glitchEffect} 0.3s cubic-bezier(.25,.46,.45,.94) both;
    }
  }
`

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  overflow: visible;
  
  @media (prefers-color-scheme: dark) {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.1));
  }
`

const baseTextStyles = styled.span`
  font-family: 'VALORANT', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 1.75rem;
  letter-spacing: 0.1em;
  position: relative;
  animation: ${clipIn} 0.6s cubic-bezier(.25,.46,.45,.94) both;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-2px, -2px);
    mix-blend-mode: multiply;
    transition: all 0.2s ease;
  }

  &::after {
    clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
    transform: translate(2px, 2px);
  }

  &:hover::before {
    transform: translate(-4px, 0);
  }

  &:hover::after {
    transform: translate(4px, 0);
  }
`

const MainText = styled(baseTextStyles)`
  color: #000000;
  
  @media (prefers-color-scheme: dark) {
    color: #FFFFFF;
  }

  &::before {
    color: #FF4655;
  }

  &::after {
    color: #0ff;
  }
`

const HubText = styled(baseTextStyles)`
  color: #FF4655;
  margin: 0 0.1em;
  text-shadow: 
    0 0 10px rgba(255, 70, 85, 0.5),
    0 0 20px rgba(255, 70, 85, 0.3);
    
  &::before {
    color: #FF4655;
  }

  &::after {
    color: #FF4655;
  }
`

const LastText = styled(baseTextStyles)`
  color: #000000;
  
  @media (prefers-color-scheme: dark) {
    color: #FFFFFF;
  }

  &::before {
    color: #FF4655;
  }

  &::after {
    color: #0ff;
  }
`

const GlitchLine = styled.div`
  position: absolute;
  top: 50%;
  left: -5%;
  width: 110%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    #FF4655,
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${StyledWrapper}:hover & {
    opacity: 1;
  }
`
