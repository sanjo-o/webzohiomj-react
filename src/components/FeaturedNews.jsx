import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const newsItems = [
  {
    image: "/images/dog1.png",
    title: "Онцлох мэдээ 1:",
    description: "Мокид тусалсан бүх хүмүүстээ талархаж байна...",
    author: "Saikhantsetseg Oyunsugar",
    time: "2 цагийн өмнө"
  },
  {
    image: "/images/dog2.jpg",
    title: "Онцлох мэдээ 2:",
    description: "Шинэ мэдээний тайлбар...",
    author: "Saikhantsetseg Oyunsugar",
    time: "3 цагийн өмнө"
  },
  {
    image: "/images/dog3.png",
    title: "Онцлох мэдээ 3:",
    description: "Өөр нэг мэдээний тайлбар...",
    author: "Saikhantsetseg Oyunsugar",
    time: "4 цагийн өмнө"
  }
];

const FeaturedNews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
        setFade(true);
      }, 500); // Duration of fade out
    }, 5000); // 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
      setFade(true);
    }, 500);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
      setFade(true);
    }, 500);
  };

  const currentNews = newsItems[currentIndex];

  return (
    <NewsContainer>
      <NewsCard $fade={fade}>
        <SlideButton onClick={prevSlide} direction="left">
          &#8249;
        </SlideButton>
        
        <StyledImage 
          src={currentNews.image} 
          alt="News" 
          $fade={fade}
        />
        <NewsContent>
          <Title>{currentNews.title}</Title>
          <Description>{currentNews.description}</Description>
          <AuthorInfo>
            <AuthorAvatar>
              <img src="/images/person.png" alt="Author avatar" />
            </AuthorAvatar>
            <AuthorName>{currentNews.author}</AuthorName>
            <PostTime>{currentNews.time}</PostTime>
          </AuthorInfo>
        </NewsContent>

        <SlideButton onClick={nextSlide} direction="right">
          &#8250;
        </SlideButton>
      </NewsCard>

      <DotContainer>
        {newsItems.map((_, index) => (
          <Dot 
            key={index} 
            $active={currentIndex === index}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setCurrentIndex(index);
                setFade(true);
              }, 500);
            }}
          />
        ))}
      </DotContainer>
    </NewsContainer>
  );
};

const NewsContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SlideButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }
`;

const DotContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#333' : '#ccc'};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const NewsCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  width: 1200px;
  height: 300px;
  margin-top: 20px;
`;

const NewsContent = styled.div`
  padding: 30px;
  flex: 1;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 20px;
`;

const AuthorInfo = styled.div`

  margin-top: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuthorName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const PostTime = styled.span`
  font-size: 14px;
  color: #999;
`;

const StyledImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 20px;
  opacity: ${({ $fade }) => ($fade ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export default FeaturedNews;