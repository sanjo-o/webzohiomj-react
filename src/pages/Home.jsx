import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CampaignCard from '../components/campaign/CampaignCard';
import ScrollPanel from '../components/ScrollPanel';
import FeaturedNews from '../components/FeaturedNews';
import LoginModal from '../components/LoginModal';
import Navbar from '../components/layout/NavBar';
import { useNavigate } from 'react-router-dom';
const float = keyframes`
  0%, 100% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-10px); 
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      title: "Моки нохойны бүдүүн гэдэсний хагалгаа",
      image: "/images/dog2.jpg",
      amount: "2,500.00",
      progress: 45,
      time: "2 өдрийн өмнө"
    },
    {
      id: 2,
      title: "Муурын шарх эмчлэх",
      image: "/images/cat1.png",
      amount: "1,200.00",
      progress: 60,
      time: "1 цагийн өмнө"
    },
    {
      id: 3,
      title: "Нохойн эмчилгээ",
      image: "/images/dog2.jpg",
      amount: "3,000.00",
      progress: 30,
      time: "4 цагийн өмнө"
    },
    {
      id: 4,
      title: "Туслах хагалгаа",
      image: "/images/dog3.png",
      amount: "1,800.00",
      progress: 75,
      time: "5 өдрийн өмнө"
    },
    {
      id: 5,
      title: "Яаралтай тусламж",
      image: "/images/cat2.png",
      amount: "900.00",
      progress: 50,
      time: "Өнөөдөр"
    },
    {
      id: 6,
      title: "Вакцинжуулалт",
      image: "/images/dog4.png",
      amount: "500.00",
      progress: 85,
      time: "Маргаш"
    }
  ];

    const handleCampaignClick = (campaignId) => {
      console.log('Clicking campaign with ID:', campaignId);
      navigate(`/campaign/${campaignId}`);
  };

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
                <CardWrapper 
                  key={campaign.id}
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <CampaignCard campaign={campaign} />
                </CardWrapper>
              ))} 
            </Grid>
          </Container>
        </CampaignsSection>
      </ScrollPanel>

      <Container>
        <FeaturedNews />
      </Container>


      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  margin-top: -80px;
  padding-top: 8px;
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

const CardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default Home;