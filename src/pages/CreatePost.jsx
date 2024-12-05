import React, { useState } from 'react';
import styled from 'styled-components';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    images: [],
    category: 'dog', // default category
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });
  };

  return (
    <CreatePostWrapper>
      <CreatePostContainer>
        <Title>Хандивын пост үүсгэх</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Гарчиг</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Дэлгэрэнгүй мэдээлэл</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="targetAmount">Хандивын дүн</Label>
            <Input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
              min="0"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="category">Ангилал</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="dog">Нохой</option>
              <option value="cat">Муур</option>
              <option value="other">Бусад</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="images">Зураг оруулах</Label>
            <ImageInput
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
          </FormGroup>

          <SubmitButton type="submit">Пост үүсгэх</SubmitButton>
        </Form>
      </CreatePostContainer>
    </CreatePostWrapper>
  );
};

const CreatePostWrapper = styled.div`
  min-height: 100vh;
  padding: 120px 20px 40px;
  background-color: #f5f5f5;
`;

const CreatePostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
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

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #2F7169;
  }
`;

const ImageInput = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background: #2F7169;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #245a52;
  }
`;

export default CreatePost; 