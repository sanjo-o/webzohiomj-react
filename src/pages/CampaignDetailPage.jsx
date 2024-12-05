import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components'; 
import DonationCard from '../components/campaign/DOnationCard';

const CampaignDetailPage = () => {
  const { id } = useParams();
  // Fetch campaign details using the id
  const campaign = {
    id,
    title: "Мохи нохойны бүдгүй гэдэсний хагалгаа",
    description: "Мөки нохой нь 3 настай эр нохой бөгөөд бүдүүн гэдэсний үрэвслтэй байгаа...",
    image: "/src/components/images/dog1.png",
    progress: 45,
    amount: "250.00",
  };

  return (
    <Container>
      <Header>
        <Image src={campaign.image} alt={campaign.title} />
        <Overlay>
          <Title>{campaign.title}</Title>
          <Description>{campaign.description}</Description>
        </Overlay>
      </Header>
      <Content>
        <DonationCard campaign={campaign} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default CampaignDetailPage;