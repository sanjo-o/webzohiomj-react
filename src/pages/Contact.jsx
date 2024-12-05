import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Send, Phone, Mail, MapPin } from 'react-feather';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <ContactContainer
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LeftSection>
          <Title>Холбоо барих</Title>
          <Description>
            Та бидэнтэй холбоо барьж, амьтдад туслах аливаа санал хүсэлтээ илгээгээрэй
          </Description>
          
          <ContactInfoList>
            <ContactItem>
              <IconWrapper>
                <Phone size={20} />
              </IconWrapper>
              <div>
                <ContactLabel>Утас</ContactLabel>
                <ContactText>+976 9999-9999</ContactText>
              </div>
            </ContactItem>
            
            <ContactItem>
              <IconWrapper>
                <Mail size={20} />
              </IconWrapper>
              <div>
                <ContactLabel>И-мэйл</ContactLabel>
                <ContactText>info@pethelp.mn</ContactText>
              </div>
            </ContactItem>
            
            <ContactItem>
              <IconWrapper>
                <MapPin size={20} />
              </IconWrapper>
              <div>
                <ContactLabel>Хаяг</ContactLabel>
                <ContactText>Улаанбаатар, Монгол</ContactText>
              </div>
            </ContactItem>
          </ContactInfoList>

          <PawPrints>
            {[...Array(3)].map((_, i) => (
              <PawPrint key={i} $delay={i * 0.2} />
            ))}
          </PawPrints>
        </LeftSection>

        <RightSection>
          {showSuccess ? (
            <SuccessMessage
              as={motion.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessIcon>✓</SuccessIcon>
              <SuccessText>Таны мессеж илгээгдлээ!</SuccessText>
            </SuccessMessage>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Нэр</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Таны нэр"
                />
              </FormGroup>

              <FormGroup>
                <Label>И-мэйл</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="И-мэйл хаяг"
                />
              </FormGroup>

              <FormGroup>
                <Label>Мессеж</Label>
                <TextArea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="Та мессежээ энд бичнэ үү"
                />
              </FormGroup>

              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Илгээх
                    <Send size={18} />
                  </>
                )}
              </SubmitButton>
            </Form>
          )}
          <BirdAnimation />
        </RightSection>
      </ContactContainer>
    </PageWrapper>
  );
};

// Animations
const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-20px) }
  100% { transform: translateY(0px) }
`;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const pawPrintAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const birdFly = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -10px) rotate(5deg); }
  50% { transform: translate(20px, 0) rotate(0deg); }
  75% { transform: translate(10px, 10px) rotate(-5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  padding: 60px;
  background: #2F7169;
  color: white;
  position: relative;
  overflow: hidden;
`;

const RightSection = styled.div`
  padding: 60px;
  position: relative;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: white;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 40px;
  line-height: 1.6;
  opacity: 0.9;
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ContactText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: #2F7169;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #f0f9f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #2F7169;
`;

const SuccessText = styled.h2`
  color: #2F7169;
  font-size: 1.8rem;
  margin: 0;
`;

const PawPrints = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  display: flex;
  gap: 20px;
`;

const PawPrint = styled.div`
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  position: relative;
  animation: ${pawPrintAnimation} 1s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  &:before {
    width: 10px;
    height: 10px;
    top: -12px;
    left: 2px;
  }

  &:after {
    width: 10px;
    height: 10px;
    top: -12px;
    right: 2px;
  }
`;

const BirdAnimation = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background: url('/bird.svg') no-repeat center;
  background-size: contain;
  animation: ${birdFly} 4s ease-in-out infinite;
`;

export default Contact; 