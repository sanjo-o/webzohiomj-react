import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CampaignCard from '../components/campaign/CampaignCard';
import ScrollPanel from '../components/ScrollPanel';
import FeaturedNews from '../components/FeaturedNews';
import FooterPanel from '../components/layout/Footer';
import LoginModal from '../components/LoginModal';
import Navbar from '../components/layout/NavBar';

const float = keyframes`
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
`;

const wave = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
`;

const pawPrintAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 0.2; transform: translateY(0); }
`;

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      title: "Мохи охойны бүдгүй гэдэсний хагалгаа",
      image: "/images/dog1.png",
      progress: 45,
      amount: "250.00",
    },
    {
      id: 2,
      title: "Осолд орсон нохойны эмчилгээний зардал",
      image: "/images/dog2.jpg",
      progress: 60,
      amount: "150.00",
    },
    {
      id: 3,
      title: "Өвчтэй муурны эмчилгээний зардал.",
      image: "/images/cat1.png",
      progress: 30,
      amount: "300.00",
    },
    {
      id: 4,
      title: "Гудамжны нохдын тэжээлийн зардал.",
      image: "/images/dog3.png",
      progress: 75,
      amount: "200.00",
    },
    {
      id: 5,
      title: "Хорт хавдартай муурны мэс засал.",
      image: "/images/cat2.png",
      progress: 50,
      amount: "180.00",
    },
    {
      id: 6,
      title: "Гэмтсэн нохойны сэргээн засах эмчилгээ.",
      image: "/images/dog4.png",
      progress: 85,
      amount: "120.00",
    },
  ];

  return (
    <>
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <HeroSection>
        <Container>
          <HeroTitle>
            АМЬ БҮХЭН<br />ҮНЭ <Highlight>ЦЭНТЭЙ.</Highlight>
          </HeroTitle>
          <MoreButton>ИЛҮҮ ИХИЙГ</MoreButton>
        </Container>
      </HeroSection>

      <ScrollPanel>
        <CampaignsSection>
          <Container>
            <Grid>
              {campaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </Grid>
          </Container>
        </CampaignsSection>
      </ScrollPanel>

      <Container>
        <FeaturedNews />
      </Container>

      <FooterPanel />

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  margin-top: -80px;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &:before {
    content: '🐾';
    position: absolute;
    top: 10%;
    left: 5%;
    font-size: 2rem;
    opacity: 0.1;
    animation: ${float} 3s ease-in-out infinite;
  }

  &:after {
    content: '🐾';
    position: absolute;
    bottom: 10%;
    right: 5%;
    font-size: 2rem;
    opacity: 0.1;
    animation: ${float} 3s ease-in-out infinite;
    animation-delay: 1.5s;
  }

  // Add overlay for better text readability
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;  // Increased size
  color: #FFFFFF;
  margin-bottom: 2rem;
  line-height: 1.2;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;

  br {
    display: inline;  // Keep the line break
  }
`;

const Highlight = styled.span`
  color: #5BE9BE;
  font-size: 5rem;  // Match parent font size
`;

const MoreButton = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #245a52;
  }
`;

const CampaignsSection = styled.section`
  padding: 60px 0;
  background: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default Home;