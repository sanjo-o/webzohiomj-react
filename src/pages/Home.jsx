import React, { useState } from 'react';
import styled from 'styled-components';
import CampaignCard from '../components/campaign/CampaignCard';
import ScrollPanel from '../components/ScrollPanel';
import FeaturedNews from '../components/FeaturedNews';
import FooterPanel from '../components/layout/Footer';
import LoginModal from '../components/LoginModal';

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      title: "Мохи нохойны бүдгүй гэдэсний хагалгаа",
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
  background: url('/images/background.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 120px;
`;

const Container = styled.div`
  margin-bottom: 100px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const Highlight = styled.span`
  color: #5BE9BE;
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