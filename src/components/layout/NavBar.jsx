import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [isDropdownOpen]);

  return (
    <NavWrapper>
      <Nav>
        <LogoLink to="/">
          <Logo src="/images/logo.png" alt="PawFund Logo" />
        </LogoLink>
        <NavLinks>
          <StyledNavLink to="/search">Хайх</StyledNavLink>
          <GreenButton to="/donate">Хандив өргөх</GreenButton>
          <StyledNavLink to="/create-campaign">Хандив үүсгэх</StyledNavLink>
          <StyledNavLink to="/contact">Холбоо барих</StyledNavLink>
          
          {user ? (
            <UserSection onClick={toggleDropdown} $isOpen={isDropdownOpen}>
              <UserAvatar src={user.avatar || '/images/person.png'} />
              <DropdownContent $isOpen={isDropdownOpen}>
                <DropdownLink to="/profile" onClick={handleProfileClick}>
                  Профайл
                </DropdownLink>
                <DropdownLink to="/my-posts">
                  Миний постууд
                </DropdownLink>
                <DropdownLink to="/settings">
                  Тохиргоо
                </DropdownLink>
                <DropdownButton onClick={handleLogout}>
                  Гарах
                </DropdownButton>
              </DropdownContent>
            </UserSection>
          ) : (
            <NavButton onClick={onLoginClick}>Нэвтрэх</NavButton>
          )}
        </NavLinks>
      </Nav>
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 1.5rem;
  z-index: 1000;
  padding: 0 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 50px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 0 auto;
  height: 70px;
  box-sizing: border-box;
  position: relative;
  z-index: 1001;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 50px;
  width: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  height: 100%;
`;

const StyledNavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;

  &:hover {
    color: #2F7169;
  }
`;

const GreenButton = styled(Link)`
  background: #2F7169;
  color: white;
  padding: 0.7rem 1.4rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #245a52;
  }
`;

const DropdownContent = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 120%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  min-width: 180px;
  z-index: 1000;
`;

const UserSection = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 2rem;
  
  ${({ $isOpen }) => $isOpen && `
    &::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;
    }
  `}
`;

const UserAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #2F7169;
  object-fit: cover;
`;

const DropdownLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
  border-radius: 8px;
  text-align: left;
  font-size: 1rem;

  &:hover {
    background: #f5f5f5;
    color: #2F7169;
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1.25rem;
  color: #333;
  text-decoration: none;
  transition: all 0.3s;
  border-radius: 8px;
  text-align: left;
  border: none;
  background: none;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    color: #2F7169;
  }
`;

const NavButton = styled.button`
  color: #333;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0 0.5rem;
  position: relative;
  transition: color 0.3s;
  height: 40px;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #2F7169;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #2F7169;
    
    &::after {
      width: 100%;
    }
  }
`;

const NavbarContainer = styled.div`
  background: transparent;
  backdrop-filter: blur(5px);
  border-radius: 50px;
  margin: 20px;
  padding: 10px 20px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

export default Navbar;