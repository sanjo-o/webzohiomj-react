// src/components/CreatorPage.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const floatingAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const flyAnimation = keyframes`
  0% {
    transform: translate(-100%, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(100vw, -100vh) rotate(15deg);
    opacity: 0;
  }
`;

const Bird = styled.div`
  position: fixed;
  z-index: -1;
  width: 20px;
  height: 20px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232F7169'%3E%3Cpath d='M23.9 6.7c-.1-.3-.4-.4-.7-.3l-2.8.9c-1.3-1.8-3.4-2.9-5.6-2.9-2.9 0-5.5 1.7-6.7 4.3L5.9 7.5c-.3-.1-.6 0-.7.3s0 .6.3.7l2.8.9C7.5 11.3 7 13.3 7 15.5c0 .4.3.7.7.7s.7-.3.7-.7c0-2 .5-3.9 1.4-5.6l1.8.6c.1 0 .1 0 .2 0 .2 0 .4-.1.5-.3.1-.3 0-.6-.3-.7l-1.8-.6c1-2.1 3.1-3.4 5.4-3.4 1.9 0 3.7.9 4.8 2.4l-2.8.9c-.3.1-.4.4-.3.7.1.2.3.3.5.3.1 0 .1 0 .2 0l2.8-.9c.1 1.1-.1 2.2-.6 3.2-.1.3 0 .6.3.7.1 0 .1 0 .2 0 .2 0 .4-.1.5-.3.7-1.3.9-2.7.8-4.1l2.8-.9c.2-.1.3-.4.2-.7z'/%3E%3C/svg%3E") no-repeat;
  animation: ${flyAnimation} ${props => 15 + props.delay}s linear infinite;
  top: ${props => props.top}%;
  opacity: 0;
`;

const CreatorPage = () => {
  const creators = [
    { 
      name: 'Sanjaa', 
      socialMedia: 'https://www.instagram.com/sanjoo_____/', 
      id: 'B231880013',
      image: '/images/Sanjaa.jpg' // Replace with actual image path
    },
    { 
      name: 'Saikhanjargal', 
      socialMedia: 'https://www.instagram.com/saihnanana/', 
      id: 'B231940056',
      image: '/images/Saikhanjargal.jpg' // Replace with actual image path
    },
    { 
      name: 'Oyunsugar', 
      socialMedia: 'https://www.instagram.com/0yukanna/', 
      id: 'B231940041',
      image: '/images/Oyuka.jpg' // Replace with actual image path
    },
    { 
      name: 'Lhagvanym', 
      socialMedia: 'https://www.facebook.com/profile.php?id=100059826974608', 
      id: 'B231940052',
      image: '/images/Lhagvanym.jpg' // Replace with actual image path
    },
  ];

  const birds = Array.from({ length: 5 }).map((_, i) => ({
    top: Math.random() * 100,
    delay: Math.random() * 10
  }));

  return (
    <PageContainer>
      {birds.map((bird, i) => (
        <Bird key={i} top={bird.top} delay={bird.delay} />
      ))}
      <TeamName>Pawfund Team</TeamName>
      <CardGrid>
        {creators.map((creator, index) => (
          <Card key={index} index={index}>
            <ProfileImage src={creator.image} alt={creator.name} />
            <CardContent>
              <h3>{creator.name}</h3>
            </CardContent>
            <CardOverlay>
              <OverlayContent>
                <ProfileInfo>
                  <InfoItem>
                    <Label>Name:</Label>
                    <Value>{creator.name}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>ID:</Label>
                    <Value>{creator.id}</Value>
                  </InfoItem>
                  <InfoItem>
                    <Label>Social:</Label>
                    <SocialLink href={creator.socialMedia} target="_blank" rel="noopener noreferrer">
                      Follow Me
                    </SocialLink>
                  </InfoItem>
                </ProfileInfo>
                <StatusBadge>Active</StatusBadge>
              </OverlayContent>
            </CardOverlay>
          </Card>
        ))}
      </CardGrid>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 40px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(47, 113, 105, 0.1),
      rgba(47, 113, 105, 0.05),
      rgba(255, 255, 255, 0.1),
      rgba(47, 113, 105, 0.05)
    );
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
    z-index: -1;
  }
`;

const TeamName = styled.h1`
  margin-bottom: 40px;
  color: #2F7169;
  font-size: 2.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 4px solid #2F7169;
  transition: transform 0.3s ease;
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(47, 113, 105, 0.95);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${floatingAnimation} 3s ease-in-out infinite;
  animation-delay: ${props => props.index * 0.2}s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:hover ${CardOverlay} {
    opacity: 1;
  }

  &:hover ${ProfileImage} {
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  h3 {
    margin: 10px 0;
    color: #333;
    font-size: 1.5rem;
  }
`;

const OverlayContent = styled.div`
  padding: 20px;
  text-align: left;
`;

const ProfileInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  margin: 15px 0;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
  color: #e0e0e0;
`;

const Value = styled.span`
  color: white;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 5px 10px;
  border: 2px solid white;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #2F7169;
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.9rem;
`;

export default CreatorPage;