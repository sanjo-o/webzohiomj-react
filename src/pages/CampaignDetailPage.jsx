import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DonationCard from '../components/campaign/DOnationCard';

const CampaignDetailPage = () => {
  const { id } = useParams();
  console.log('Campaign detail page loaded with ID:', id);
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        // Mock data matching the specific campaign
        const mockCampaign = {
          id: parseInt(id),
          title: "Моки нохойны бүдүүн гэдэсний хагалгаа",
          image: "/images/dog1.png", // Update with your actual image path
          amount: "2,500.00",
          progress: 45,
          time: "2 өдрийн өмнө",
          description: `Моки нохой нь 3 настай эр нохой бөгөөд бүдүүн гэдэсний үрэвслтэй байгаа. 
            Түүний эмчилгээнд яаралтай хагалгаа шаардлагатай байгаа бөгөөд энэхүү эмчилгээний 
            зардалд туслалцаа хэрэгтэй байна.
            
            Хагалгааны зардал: ₮2,500.00
            Одоогийн байдлаар: 45% цугларсан
            
            Та бүхний дэмжлэг Мокид маш их хэрэгтэй байна.`,
          targetAmount: "2,500.00",
          currentAmount: "1,125.00", // 45% of 2,500
          comments: [
            { id: 1, user: "Бат", text: "Эдгэрээрэй", timestamp: "2024-03-20 14:30" },
            { id: 2, user: "Болд", text: "Тусламж хэрэгтэй байна", timestamp: "2024-03-20 15:45" }
          ]
        };
        setCampaign(mockCampaign);
        setComments(mockCampaign.comments);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "Хэрэглэгч", // Replace with actual logged-in user
      text: newComment,
      timestamp: new Date().toLocaleString()
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  if (loading) return <div>Loading...</div>;
  if (!campaign) return <div>Campaign not found</div>;

  return (
    <Container>
      <Header>
        <Image src={campaign?.image} alt={campaign?.title} />
        <Overlay>
          <Title>{campaign?.title}</Title>
          <Description>{campaign?.description}</Description>
        </Overlay>
      </Header>
      
      <Content>
        <MainContent>
          <DetailSection>
            <h2>Дэлгэрэнгүй мэдээлэл</h2>
            <DetailInfo>
              <InfoItem>
                <h3>Зорилтот дүн</h3>
                <p>₮{campaign.targetAmount}</p>
              </InfoItem>
              <InfoItem>
                <h3>Одоогийн дүн</h3>
                <p>₮{campaign.currentAmount}</p>
              </InfoItem>
              <InfoItem>
                <h3>Явц</h3>
                <p>{campaign.progress}%</p>
              </InfoItem>
            </DetailInfo>
            <Description>{campaign.description}</Description>
          </DetailSection>

          <CommentSection>
            <h2>Сэтгэгдэл</h2>
            <CommentForm onSubmit={handleCommentSubmit}>
              <CommentInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Сэтгэгдэл үлдээх..."
              />
              <CommentButton type="submit">Илгээх</CommentButton>
            </CommentForm>

            <CommentList>
              {comments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentHeader>
                    <CommentUser>{comment.user}</CommentUser>
                    <CommentTime>{comment.timestamp}</CommentTime>
                  </CommentHeader>
                  <CommentText>{comment.text}</CommentText>
                </CommentItem>
              ))}
            </CommentList>
          </CommentSection>
        </MainContent>

        <Sidebar>
          <DonationCard campaign={campaign} />
        </Sidebar>
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
  white-space: pre-line;
  line-height: 1.6;
  color: #ffffff;
  margin: 20px 0;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
`;

const Sidebar = styled.div`
  position: sticky;
  top: 20px;
  height: fit-content;
`;

const DetailSection = styled.section`
  margin-bottom: 40px;
`;

const CommentSection = styled.section`
  margin-top: 30px;
`;

const CommentForm = styled.form`
  margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  min-height: 80px;
  resize: vertical;
`;

const CommentButton = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #245a52;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const CommentUser = styled.span`
  font-weight: bold;
`;

const CommentTime = styled.span`
  color: #666;
  font-size: 0.9em;
`;

const CommentText = styled.p`
  margin: 0;
`;

const DetailInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const InfoItem = styled.div`
  text-align: center;
  
  h3 {
    color: #2F7169;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

export default CampaignDetailPage;