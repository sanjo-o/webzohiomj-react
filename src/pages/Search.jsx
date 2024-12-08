import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // You'll need to install framer-motion

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('today');

  const petData = [
    {
      id: 1,
      title: "Моки нохойны бүдүүн гэдэсний хагалгаа.",
      price: "2500$",
      time: "2 өдрийн өмнө",
      image: "/images/dog1.png"
    },
    {
      id: 2,
      title: "Муурын шарх эмчлэх",
      price: "1200$",
      time: "1 цагийн өмнө",
      image: "/images/cat1.png"
    },
    {
      id: 3,
      title: "Нохойн эмчилгээ",
      price: "3000$",
      time: "4 цагийн өмнө",
      image: "/images/dog2.png"
    },
    {
      id: 4,
      title: "Туслах хагалгаа",
      price: "1800$",
      time: "5 өдрийн өмнө",
      image: "/images/surgery.jpg"
    },
    {
      id: 5,
      title: "Яаралтай тусламж",
      price: "900$",
      time: "Өнөөдөр",
      image: "/images/emergency.jpg"
    },
    {
      id: 6,
      title: "Вакцинжуулалт",
      price: "500$",
      time: "Маргааш",
      image : "/images/vaccine.jpg"
    }
  ];

  return (
    <PageContainer>
      <SearchSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SearchTitle>Хайлт</SearchTitle>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="Хайх..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton>
            <SearchIcon>🔍</SearchIcon>
          </SearchButton>
        </SearchBar>
      </SearchSection>

      <FilterSection>
        <FilterButton 
          active={selectedFilter === 'today'} 
          onClick={() => setSelectedFilter('today')}
        >
          Өнөөдөр болж буй
        </FilterButton>
        <FilterButton 
          active={selectedFilter === 'nearby'} 
          onClick={() => setSelectedFilter('nearby')}
        >
          Таньтай ойролцоо
        </FilterButton>
        <FilterButton 
          active={selectedFilter === 'nonprofit'} 
          onClick={() => setSelectedFilter('nonprofit')}
        >
          Ашгийн бус
        </FilterButton>
      </FilterSection>

      <CardsGrid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {petData.map((pet, index) => (
          <PetCard key={pet.id}>
            <CardImage style={{ 
              backgroundColor: `hsl(${index * 60}, 70%, 90%)` // Different color for each card
            }} />
            <CardContent>
              <CardText>{pet.title}</CardText>
              <PriceBar>
                <Price>{pet.price}</Price>
                <TimeStamp>{pet.time}</TimeStamp>
              </PriceBar>
            </CardContent>
          </PetCard>
        ))}
      </CardsGrid>

      <Footer>
        <FooterSection>
          <FooterTitle>Хандив өргөх бол</FooterTitle>
          <FooterLink>Ангилалууд</FooterLink>
          <FooterLink>Хан</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Хандив үүсгэх бол</FooterTitle>
          <FooterLink>Ангилалууд</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Бидний тухай</FooterTitle>
          <FooterLink>Аэтай савар</FooterLink>
          <FooterLink>Холбогдох дугаар</FooterLink>
          <FooterLink>FACEBOOK бүлэг</FooterLink>
          <FooterLink>Ангилалууд</FooterLink>
        </FooterSection>
      </Footer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  padding: 120px 20px 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const SearchSection = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SearchTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  padding: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 15px 25px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  outline: none;
  color: #2c3e50;

  &::placeholder {
    color: #95a5a6;
  }
`;

const SearchButton = styled.button`
  background: #2c3e50;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #34495e;
    transform: rotate(5deg);
  }
`;

const SearchIcon = styled.span`
  font-size: 1.2rem;
  color: white;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  border: none;
  background: ${props => props.active ? '#2c3e50' : '#fff'};
  color: ${props => props.active ? '#fff' : '#2c3e50'};
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${props => props.active ? '#2c3e50' : '#f5f5f5'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const PetCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #e0e0e0; // Placeholder color
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background: ${props => props.index % 2 === 0 ? '#e0f7f6' : '#f0f9f8'};
  transition: background-color 0.3s ease;

  &:hover {
    background: #d0f2f1;
  }
`;

const CardText = styled.p`
  margin: 0;
  color: #2c3e50;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const PriceBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  color: #2c3e50;
  font-weight: bold;
`;

const TimeStamp = styled.span`
  color: #95a5a6;
  font-size: 0.9rem;
`;

const Footer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 4rem 2rem;
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 200px;
`;

const FooterTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #95a5a6;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: white;
  }
`;

export default Search; 