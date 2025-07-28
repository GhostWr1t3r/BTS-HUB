import styled from "@emotion/styled"
import Link from "next/link"
import { useState, useCallback } from "react"
import { Menu, X } from "lucide-react"
import { useRouter } from 'next/router'

interface NavLink {
  id: number
  name: string
  to: string
  isExternal?: boolean
}

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const links: NavLink[] = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "About", to: "/about" },
    { id: 3, name: "Library", to: "https://bts-library.net3lix.world", isExternal: true },
  ]

  const handleNavigation = useCallback((href: string, isExternal: boolean | undefined, e: React.MouseEvent) => {
    e.preventDefault()
    setIsOpen(false)
    
    if (isExternal) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else {
      router.push(href)
    }
  }, [router])

  return (
    <StyledWrapper>
      <DesktopNav aria-label="Main navigation">
        <NavLinks>
          {links.map((link) => (
            <NavItem key={link.id} $isActive={router.pathname === link.to}>
              <Link 
                href={link.to} 
                onClick={(e) => handleNavigation(link.to, link.isExternal, e)}
                aria-current={router.pathname === link.to ? "page" : undefined}
                {...(link.isExternal && { 
                  rel: "noopener noreferrer",
                  target: "_blank"
                })}
              >
                {link.name}
              </Link>
            </NavItem>
          ))}
        </NavLinks>
      </DesktopNav>

      <MobileNav>
        <MenuButton 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          $isOpen={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </MenuButton>

        <MobileNavLinks $isOpen={isOpen}>
          {links.map((link) => (
            <NavItem key={link.id} $isActive={router.pathname === link.to}>
              <Link 
                href={link.to} 
                onClick={(e) => handleNavigation(link.to, link.isExternal, e)}
                aria-current={router.pathname === link.to ? "page" : undefined}
                {...(link.isExternal && { 
                  rel: "noopener noreferrer",
                  target: "_blank"
                })}
              >
                {link.name}
              </Link>
            </NavItem>
          ))}
        </MobileNavLinks>
      </MobileNav>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileNav = styled.nav`
  display: none;
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const MobileNavLinks = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  width: 200px;
  background: ${({ theme }) => theme.colors.gray2};
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 0.5rem;
  margin: 0;
  list-style: none;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform-origin: top right;
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.95)')};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`

const MenuButton = styled.button<{ $isOpen: boolean }>`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.gray11};
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.gray3};
  }
`

const NavItem = styled.li<{ $isActive: boolean }>`
  a {
    display: block;
    text-decoration: none;
    color: ${({ theme, $isActive }) => 
      $isActive ? theme.colors.gray12 : theme.colors.gray11};
    font-weight: ${({ $isActive }) => ($isActive ? 500 : 400)};
    transition: all 0.2s ease;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    white-space: nowrap;

    &:hover {
      color: ${({ theme }) => theme.colors.gray12};
      background: ${({ theme }) => theme.colors.gray3};
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    a {
      padding: 0.75rem 1rem;
    }
  }
`

export default NavBar
