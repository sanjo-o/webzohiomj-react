import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
  const { currentUser: user, updateUser } = useAuth();
  console.log('Current user:', user);
  console.log('Auth state:', { user, isAuthenticated: !!user });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    avatar: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/profile');
        console.log('Profile response:', response.data);
        updateUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.response?.data?.message || 'Failed to load profile');
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, updateUser]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError('Зургийн хэмжээ 5MB-с бага байх ёстой');
        return;
      }
      setFormData({
        ...formData,
        avatar: file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await api.put('/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      updateUser(response.data.user);
      setSuccess('Мэдээлэл амжилттай шинэчлэгдлээ');
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Алдаа гарлаа');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <PageContainer>
        <ErrorMessage>Нэвтрэх шаардлагатай</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ProfileContainer>
        <ProfileCard>
          <ProfileHeader>
            <AvatarSection>
              <Avatar src={user.avatar || '/images/person.png'} alt="Profile" />
              <UserName>{user.name}</UserName>
              <UserEmail>{user.email}</UserEmail>
            </AvatarSection>
          </ProfileHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          {isEditing ? (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Нэр</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Таны нэр"
                />
              </FormGroup>
              <FormGroup>
                <Label>Утас</Label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Утасны дугаар"
                />
              </FormGroup>
              <FormGroup>
                <Label>Хаяг</Label>
                <TextArea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Хаяг"
                  rows="3"
                />
              </FormGroup>
              <FormGroup>
                <Label>Профайл зураг</Label>
                <ImageUploadInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="avatar-upload"
                />
                <ImageUploadLabel htmlFor="avatar-upload">
                  Зураг сонгох
                </ImageUploadLabel>
              </FormGroup>
              <ButtonGroup>
                <SaveButton type="submit" disabled={isLoading}>
                  {isLoading ? 'Хадгалж байна...' : 'Хадгалах'}
                </SaveButton>
                <CancelButton type="button" onClick={() => setIsEditing(false)}>
                  Цуцлах
                </CancelButton>
              </ButtonGroup>
            </Form>
          ) : (
            <InfoSection>
              <InfoGrid>
                <InfoItem>
                  <Label>Утас:</Label>
                  <Value>{user.phone || 'Оруулаагүй байна'}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Хаяг:</Label>
                  <Value>{user.address || 'Оруулаагүй байна'}</Value>
                </InfoItem>
              </InfoGrid>
              <EditButton onClick={() => setIsEditing(true)}>
                Мэдээлэл засах
              </EditButton>
            </InfoSection>
          )}
        </ProfileCard>
      </ProfileContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  padding: 120px 20px 40px;
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  object-fit: cover;
  border: 4px solid #2F7169;
`;

const UserName = styled.h2`
  font-size: 1.8rem;
  color: #2F7169;
  margin: 0 0 10px;
`;

const UserEmail = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
`;

const Label = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 5px;
`;

const Value = styled.p`
  color: #333;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`;

const EditButton = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 20px;

  &:hover {
    background: #245a52;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background: #2F7169;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 1rem;
  transition: background 0.3s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background: ${props => props.disabled ? '#2F7169' : '#245a52'};
  }
`;

const CancelButton = styled.button`
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e33;
  background: #fee;
  border-radius: 8px;
  margin: 1rem;
`;

const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoSection = styled.section`
  text-align: center;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 12px 24px;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #e0e0e0;
  }
`;

export default Profile;