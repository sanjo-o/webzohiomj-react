import React from 'react';
import styled from 'styled-components';
import ProgressBar from '../common/ProgressBar';

const CampaignCard = ({ campaign }) => {
  return (
    <CardWrapper>
      <ImageContainer>
        <CardImage src={campaign.image} alt={campaign.title} />
      </ImageContainer>
      <CardContent>
        <CardTitle>{campaign.title}</CardTitle>
        <ProgressBarContainer>
          <ProgressBar progress={campaign.progress} />
          <ProgressDetails>
            <Amount>{campaign.amount}₮</Amount>
            <Progress>{campaign.progress}%</Progress>
          </ProgressDetails>
        </ProgressBarContainer>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background: #f0f9f9;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ProgressBarContainer = styled.div`
  margin-top: auto;
`;

const ProgressDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const Amount = styled.span`
  font-weight: 500;
  color: #333;
`;

const Progress = styled.span`
  color: #2F7169;
  font-weight: 500;
`;

export default CampaignCard;