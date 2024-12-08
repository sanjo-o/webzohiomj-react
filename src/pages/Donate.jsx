import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CreditCard, DollarSign, Heart, Check } from 'react-feather';
import confetti from 'canvas-confetti'; // Install with: npm install canvas-confetti

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    message: ''
  });

  const predefinedAmounts = [5000, 10000, 20000, 50000];

  const handleAmountClick = (value) => {
    setAmount(value.toString());
    // Add ripple effect here if desired
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success animation
      setShowSuccess(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Reset form after delay
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        setFormData({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          name: '',
          email: '',
          message: ''
        });
        setAmount('');
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      console.error('Error:', error);
    }
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiryDate = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    // Apply formatting based on field
    if (name === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '').slice(0, 3);
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <PageWrapper>
      <DonateContainer $showSuccess={showSuccess}>
        {showSuccess ? (
          <SuccessMessage>
            <SuccessIcon>
              <Check size={48} color="#2F7169" />
            </SuccessIcon>
            <SuccessText>Хандив амжилттай!</SuccessText>
            <SuccessSubtext>Таны хандивыг хүлээн авлаа</SuccessSubtext>
          </SuccessMessage>
        ) : (
          <>
            <DonateHeader>
              <HeartIcon>
                <Heart size={32} color="#2F7169" />
              </HeartIcon>
              <Title>Хандив өргөх</Title>
              <Subtitle>Таны өргөсөн хандив амьтдад туслахад зориулагдана</Subtitle>
            </DonateHeader>

            <Form onSubmit={handleSubmit}>
              <Section>
                <SectionTitle>
                  <DollarSign size={20} />
                  Хандивын дүн
                </SectionTitle>
                <AmountGrid>
                  {predefinedAmounts.map((value) => (
                    <AmountButton
                      key={value}
                      type="button"
                      onClick={() => handleAmountClick(value)}
                      $active={amount === value.toString()}
                    >
                      {value.toLocaleString()}₮
                      <Ripple />
                    </AmountButton>
                  ))}
                </AmountGrid>
                <CustomAmountInput
                  type="number"
                  placeholder="Өөр дүн оруулах"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Section>

              <Section>
                <SectionTitle>Төлбөрийн хэлбэр</SectionTitle>
                <PaymentMethodGrid>
                  <PaymentMethodButton
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    $active={paymentMethod === 'card'}
                  >
                    <CreditCard size={24} />
                    <span>Картаар</span>
                  </PaymentMethodButton>
                  <PaymentMethodButton
                    type="button"
                    onClick={() => setPaymentMethod('qpay')}
                    $active={paymentMethod === 'qpay'}
                  >
                    <DollarSign size={24} />
                    <span>QPay</span>
                  </PaymentMethodButton>
                </PaymentMethodGrid>
              </Section>

              {paymentMethod === 'card' ? (
                <Section>
                  <SectionTitle>Картын мэдээлэл</SectionTitle>
                  <CardDetailsGrid>
                    <FormGroup>
                      <Label>Картын дугаар</Label>
                      <Input
                        type="text"
                        name="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormRow>
                      <FormGroup>
                        <Label>Дуусах хугацаа</Label>
                        <Input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>CVV</Label>
                        <Input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </FormRow>
                  </CardDetailsGrid>
                </Section>
              ) : (
                <Section>
                  <SectionTitle>QPay мэдээлэл</SectionTitle>
                  <QPayContainer>
                    <QRCodePlaceholder>
                      <QRImage src="/images/qr.png" alt="QR Code" />
                    </QRCodePlaceholder>
                    <QPayInstructions>
                      <InstructionStep>
                        1. QPay апликэйшн нээнэ
                      </InstructionStep>
                      <InstructionStep>
                        2. QR уншуулах товчийг дарна
                      </InstructionStep>
                      <InstructionStep>
                        3. Дэлгэц дээрх QR кодыг уншуулна
                      </InstructionStep>
                      <InstructionStep>
                        4. Гүйлгээг баталгаажуулна
                      </InstructionStep>
                    </QPayInstructions>
                  </QPayContainer>
                </Section>
              )}

              <Section>
                <SectionTitle>Хандивлагчийн мэдээлэл</SectionTitle>
                <FormGroup>
                  <Label>Нэр</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Таны нэр"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>И-мэйл</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="И-мэйл хаяг"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Захидал (заавал биш)</Label>
                  <TextArea
                    name="message"
                    placeholder="Таны захидал..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Section>

              <SubmitButton 
                type="submit" 
                disabled={isSubmitting}
                $isSubmitting={isSubmitting}
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  'Хандив өргөх'
                )}
              </SubmitButton>
            </Form>
          </>
        )}
      </DonateContainer>
    </PageWrapper>
  );
};

// Animations
const heartBeat = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rippleEffect = keyframes`
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding: 40px 20px;
`;

const DonateContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.5s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const HeartIcon = styled.div`
  animation: ${heartBeat} 1.5s ease-in-out infinite;
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background: rgba(47, 113, 105, 0.3);
  transform: scale(0);
  animation: ${rippleEffect} 0.6s linear;
  pointer-events: none;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px;
  animation: ${fadeIn} 0.5s ease-out;
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
  animation: ${fadeIn} 0.5s ease-out;
`;

const DonateHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #2F7169;
  margin: 16px 0 8px;
  font-size: 2rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const AmountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
`;

const AmountButton = styled.button`
  position: relative;
  padding: 16px;
  border: 2px solid ${props => props.$active ? '#2F7169' : '#eee'};
  border-radius: 12px;
  background: ${props => props.$active ? 'rgba(47, 113, 105, 0.1)' : 'white'};
  color: ${props => props.$active ? '#2F7169' : '#333'};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2F7169;
    background: rgba(47, 113, 105, 0.05);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CustomAmountInput = styled.input`
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const PaymentMethodButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  border: 2px solid ${props => props.$active ? '#2F7169' : '#eee'};
  border-radius: 12px;
  background: ${props => props.$active ? 'rgba(47, 113, 105, 0.1)' : 'white'};
  color: ${props => props.$active ? '#2F7169' : '#333'};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2F7169;
    background: rgba(47, 113, 105, 0.05);
  }
`;

const CardDetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
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

  &::placeholder {
    color: #aaa;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  background: #2F7169;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: ${props => props.$isSubmitting ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$isSubmitting ? '#2F7169' : '#245a52'};
    transform: ${props => props.$isSubmitting ? 'none' : 'translateY(-2px)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const SuccessText = styled.h2`
  color: #2F7169;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 20px 0 10px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const SuccessSubtext = styled.p`
  color: #666;
  font-size: 1.1rem;
  animation: ${fadeIn} 0.5s ease-out;
  animation-delay: 0.1s;
  opacity: 0;
  animation-fill-mode: forwards;
`;

const QPayContainer = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QRCodePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const QRImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
  
  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

const QPayInstructions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InstructionStep = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    background: #2F7169;
    border-radius: 50%;
  }
`;

export default Donate; 