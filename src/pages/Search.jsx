import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion'; // You'll need to install framer-motion
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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
      title: "Гэмтсэн амьтад",
      price: "1800$",
      time: "5 өдрийн өмнө",
      image: "/images/animals.jpg"
    },
    {
      id: 5,
      title: "Яаралтай тусламж",
      price: "900$",
      time: "Өнөөдөр",
      image: "/images/dog3.png"
    },
    {
      id: 6,
      title: "Вакцинжуулалт",
      price: "500$",
      time: "Маргааш",
      image : "/images/vaccine.png"
    }
  ];

  // Add category options
  const categoryOptions = {
    animals: ['Муур', 'Нохой', 'Загас', 'Яст мэлхий', 'Үхэр'],
    services: ['Мэс засал', 'Вакцин', 'Эмчилгээ', 'Яаралтай'],
    locations: ['Эмнэлэг', 'Байр', 'Гэр']
  };

  const timeOptions = [
    { label: 'Бүгд', value: 'all' },
    { label: '24 цагийн өмнө', value: '24h' },
    { label: '7 өдрийн өмнө', value: '7d' },
    { label: '30 өдрийн өмнө', value: '30d' },
    { label: '12 сарын өмнө', value: '12m' },
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    marginTop: '10px'
  };

  const defaultOptions = {
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  const [center, setCenter] = useState({
    lat: 47.9184676,  // MUST coordinates
    lng: 106.9177016
  });

  // Create MapSection component inside Search
  const MapSection = () => (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={defaultOptions}
      >
        <Marker
          position={center}
          title="MUST - School of Information and Communication Technology"
        />
      </GoogleMap>
    </LoadScript>
  );

  // Add new component for nonprofit panels
  const NonprofitPanels = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 20px'
      }}
    >
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <motion.div 
          key={item}
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            border: item === 3 ? '2px solid #4299e1' : '1px solid #e2e8f0'
          }}
        >
          <img 
            src="/images/aztaisavar.png" 
            alt="Азтай савар ТББ"
            style={{ width: '100%', maxWidth: '200px', margin: '0 auto', display: 'block' }}
          />
          <h3>Азтай савар ТББ</h3>
          <p>3, 1st building, Chingeltei district,<br />Ulaanbaatar, Mongolia</p>
          <p style={{ fontSize: '0.9rem', color: '#4A5568' }}>
          "АЗТАЙ САВАР" ТББ нь хүн болон тэжээвэр амьтан хоорондох аюулгүй, эрүүл мөн эерэг харилцаа бүрдүүлэх��йн төлөө ажиллаж байна. Бид тэжээвэр амьтдын төлөө дуу хоолой��оо хүргэх, мэс заслын аргаар нохой, муурны үржлийг .........................
          </p>
        </motion.div>
      ))}
    </motion.div>
  );

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

      <FilterContainer>
        <FilterDropdown>
          <FilterButton onClick={() => setSelectedLocation(prev => !prev)}>
            Байршил <span>▼</span>
          </FilterButton>
          {selectedLocation && (
            <DropdownContent style={{ width: '400px' }}>
              <SearchInput
                type="text"
                placeholder="Хайх газраа оруулна уу"
                style={{ margin: '10px' }}
              />
              <LocationText>
                ШУТИС Мэдээлэл холбоо технологийн сургууль
              </LocationText>
              <MapSection />
            </DropdownContent>
          )}
        </FilterDropdown>

        <FilterDropdown>
          <FilterButton onClick={() => setSelectedCategory(prev => !prev)}>
            Ангилал <span>▼</span>
          </FilterButton>
          {selectedCategory && (
            <CategoryDropdown>
              <CategoryHeader>
                <CategoryTitle>Нэг ба олон ангилал сонгоно уу</CategoryTitle>
                <SearchInput
                  type="text"
                  placeholder="Хайх..."
                  style={{ margin: '10px 0' }}
                />
              </CategoryHeader>
              
              {Object.entries(categoryOptions).map(([category, items]) => (
                <CategorySection key={category}>
                  <CategoryLabel>{category === 'animals' ? 'Амьтад' : 
                                category === 'services' ? 'Үйлчилгээ' : 'Байршил'}</CategoryLabel>
                  <TagContainer>
                    {items.map((item, index) => (
                      <Tag key={index}>
                        <TagCheckbox type="checkbox" id={`tag-${category}-${index}`} />
                        <TagLabel htmlFor={`tag-${category}-${index}`}>
                          {item}
                        </TagLabel>
                      </Tag>
                    ))}
                  </TagContainer>
                </CategorySection>
              ))}
              
              <CategoryFooter>
                <CategoryButton $variant="outline">Цэвэрлэх</CategoryButton>
                <CategoryButton $variant="filled">Хадгалах</CategoryButton>
              </CategoryFooter>
            </CategoryDropdown>
          )}
        </FilterDropdown>

        <FilterDropdown>
          <FilterButton onClick={() => setSelectedTime(prev => !prev)}>
            Хэзээ <span>▼</span>
          </FilterButton>
          {selectedTime && (
            <DropdownContent>
              <TimeTitle>Цаг аа сонгоно уу</TimeTitle>
              {timeOptions.map((option, index) => (
                <TimeOption key={index}>
                  {option.label}
                </TimeOption>
              ))}
            </DropdownContent>
          )}
        </FilterDropdown>
      </FilterContainer>

      <FilterSection>
        <FilterButton 
          $active={selectedFilter === 'today'} 
          onClick={() => setSelectedFilter('today')}
        >
          Өнөөдөр болж буй
        </FilterButton>
        <FilterButton 
          $active={selectedFilter === 'nearby'} 
          onClick={() => setSelectedFilter('nearby')}
        >
          Таньтай ойролцоо
        </FilterButton>
        <FilterButton 
          $active={selectedFilter === 'nonprofit'} 
          onClick={() => setSelectedFilter('nonprofit')}
        >
          Ашгийн бус
        </FilterButton>
      </FilterSection>

      {selectedFilter === 'nonprofit' ? (
        <NonprofitPanels />
      ) : (
        <CardsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {petData.map((pet, index) => (
            <PetCard key={pet.id}>
              <CardImage $image={pet.image} />
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
      )}
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
  background: ${props => props.$active ? '#2c3e50' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#2c3e50'};
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: ${props => props.$active ? '#2c3e50' : '#f5f5f5'};
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
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 20px;
  flex-wrap: wrap;
`;

const FilterDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 250px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 1rem;
  z-index: 1000;
  margin-top: 0.5rem;
`;

const CategoryDropdown = styled(DropdownContent)`
  width: 350px;
  padding: 0;
  overflow: hidden;
`;

const CategoryHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #edf2f7;
`;

const CategoryTitle = styled.h3`
  font-size: 1rem;
  color: #2d3748;
  margin: 0;
  margin-bottom: 10px;
`;

const CategorySection = styled.div`
  padding: 15px;
  border-bottom: 1px solid #edf2f7;
`;

const CategoryLabel = styled.h4`
  font-size: 0.9rem;
  color: #4a5568;
  margin: 0;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  position: relative;
`;

const TagCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked + label {
    background: #2c3e50;
    color: white;
    border-color: #2c3e50;
  }
`;

const TagLabel = styled.label`
  display: inline-block;
  padding: 6px 12px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7fafc;
    border-color: #cbd5e0;
  }
`;

const CategoryFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 15px;
  background: #f7fafc;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$variant === 'outline' ? `
    background: transparent;
    border: 1px solid #cbd5e0;
    color: #4a5568;
    
    &:hover {
      background: #edf2f7;
    }
  ` : `
    background: #2c3e50;
    border: 1px solid #2c3e50;
    color: white;
    
    &:hover {
      background: #1a202c;
      border-color: #1a202c;
    }
  `}
`;

const TimeTitle = styled.h3`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const TimeOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const LocationText = styled.p`
  padding: 0.5rem;
  color: #666;
`;

export default Search; 