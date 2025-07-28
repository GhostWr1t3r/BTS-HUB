import NavBar from "./NavBar"
import Logo from "./Logo"
import ThemeToggle from "./ThemeToggle"
import styled from "@emotion/styled"
import { zIndexes } from "src/styles/zIndexes"
import { useState } from "react"

type Props = {
  fullWidth: boolean
}

const Header: React.FC<Props> = ({ fullWidth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <StyledWrapper>
      <div data-full-width={fullWidth} className="container">
        <div className="logo-section">
          <Logo />
        </div>
        <div className="nav">
          <NavBar />
          <div className="theme-toggle">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </StyledWrapper>
  )
}

export default Header

const StyledWrapper = styled.div`
  z-index: ${zIndexes.header};
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray2};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  .container {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1120px;
    height: 4rem; /* Increased for better touch targets */
    margin: 0 auto;
    position: relative;

    @media (max-width: 768px) {
      height: 3.5rem;
    }

    &[data-full-width="true"] {
      @media (min-width: 768px) {
        padding-left: 6rem;
        padding-right: 6rem;
      }

      @media (max-width: 767px) {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
    }

    .logo-section {
      display: flex;
      align-items: center;
      z-index: ${zIndexes.header + 1}; /* Keep logo above mobile menu */
    }

    .nav {
      display: flex;
      gap: 0.75rem;
      align-items: center;

      @media (max-width: 768px) {
        gap: 0.5rem;
      }
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      margin-left: 0.5rem;

      @media (max-width: 768px) {
        margin-left: 0.25rem;
      }
    }
  }

  /* Handle iOS safe areas */
  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: env(safe-area-inset-top);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }

  /* Prevent content shift when switching between mobile/desktop */
  @media (min-width: 769px) {
    min-height: 4rem;
  }

  @media (max-width: 768px) {
    min-height: 3.5rem;
  }

  /* Ensure smooth transitions */
  transition: all 0.2s ease-in-out;
`
