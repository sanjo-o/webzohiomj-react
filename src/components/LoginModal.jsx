import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const images = [
  '/images/login1.png',
  '/images/login2.png',
  '/images/login3.png'
];

const LoginModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [imageFade, setImageFade] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFade(true);
    } else {
      setFade(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageFade(false); // Start fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setImageFade(true); // Start fade in
      }, 500); // Wait for fade out to complete
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDotClick = (index) => {
    setImageFade(false);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setImageFade(true);
    }, 500);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      console.log('Register attempt with:', formData);
      await register(formData);
      console.log('Registration successful, token:', localStorage.getItem('token'));
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Login attempt with:', formData);
      await login({
        email: formData.email,
        password: formData.password
      });
      console.log('Login successful, token:', localStorage.getItem('token'));
      onClose();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!isOpen && !fade) return null;

  return (
    <Overlay onClick={handleOverlayClick} $fade={fade}>
      <Modal $fade={fade}>
        <Form onSubmit={isLogin ? handleLogin : handleRegister}>
          <Title>{isLogin ? "Нэвтрэх" : "Сайн байна уу?"}</Title>
          
          {!isLogin && (
            <Input 
              name="name"
              placeholder="Нэр" 
              value={formData.name}
              onChange={handleInputChange}
            />
          )}
          <Input 
            name="email"
            type="email"
            placeholder="И-мэйл" 
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input 
            name="password"
            type="password" 
            placeholder="Нууц үг"
            value={formData.password}
            onChange={handleInputChange}
          />
          
          <Button type="submit">
            {isLogin ? "Нэвтрэх" : "Бүртгүүлэх"}
          </Button>
          
          <Text>
            {isLogin ? (
              <>Бүртгэл байхгүй юу? <Link onClick={() => setIsLogin(false)}>Бүртгүүлэх</Link></>
            ) : (
              <>Бүртгэл байгаа юу? <Link onClick={() => setIsLogin(true)}>Нэвтрэх</Link></>
            )}
          </Text>
          
          <Divider>OR</Divider>
          
          <SocialButtons>
            <SocialButton type="button">
              <img src="/images/google_icon.png" alt="Google" style={{ width: '24px', marginRight: '12px' }} />
              Sign up with Google
            </SocialButton>
            <SocialButton type="button">
              <img src="/images/facebook_icon.png" alt="Facebook" style={{ width: '24px', marginRight: '12px' }} />
              Sign up with Facebook
            </SocialButton>
          </SocialButtons>
        </Form>
        <ImageContainer>
          <StyledImage 
            src={images[currentImageIndex]} 
            alt="Background" 
            $fade={imageFade}
          />
          <DotContainer>
            {images.map((_, index) => (
              <Dot
                key={index}
                $active={currentImageIndex === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotContainer>
        </ImageContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </Modal>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Modal = styled.div`
  background: white;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  width: 1000px;
  height: 600px;
  max-width: 95%;
  position: relative;
  transform: ${({ $fade }) => ($fade ? 'scale(1)' : 'scale(0.9)')};
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  color: #2F7169;
  font-size: 32px;
  font-weight: 600;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const Button = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #245a52;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Text = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Link = styled.span`
  color: #2F7169;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #245a52;
  }
`;

const Divider = styled.div`
  margin: 25px 0;
  text-align: center;
  color: #999;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e0e0e0;
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SocialButton = styled.button`
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f8f8;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #f0f0f0; // Prevents flash between images
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 28px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  color: #666;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #333;
    transform: rotate(90deg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background: ${({ $active }) => ($active ? '#2F7169' : '#ccc')};
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
`;

export default LoginModal; 