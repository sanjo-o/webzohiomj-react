import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FooterPanel = () => {
  const navigate = useNavigate();
  
  return (
    <FooterContainer>
      <FooterGrid>
        <Column>
          <Title>Хандив өргөх бол</Title>
          <List>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
          </List>
        </Column>

        <Column>
          <Title>Хандив үүсгэх бол</Title>
          <List>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
            <ListItem>Ангилалууд</ListItem>
          </List>
        </Column>

        <Column>
          <Title>Бидний тухай</Title>
          <List>
            <ListItem>Азтай савар</ListItem>
            <ListItem>Холбогдох дугаар</ListItem>
            <ListItem>FACEBOOK бүлэг</ListItem>
          <ListItem onClick={() => navigate('/creator')}>Дэлгэрэнгүй</ListItem>
          </List>
        </Column>
      </FooterGrid>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: #ffffff;
  padding: 60px 20px;
  width: 100%;
  margin: 0;
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: #666;
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #2F7169;
  }
`;

export default FooterPanel;