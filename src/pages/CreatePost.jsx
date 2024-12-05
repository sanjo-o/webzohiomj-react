import React, { useState, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Upload, X, MapPin, Camera, AlertCircle } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion'; // Install with: npm install framer-motion

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetAmount: '',
    images: [],
    category: 'dog',
    location: null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [previewIndex, setPreviewIndex] = useState(0);

  // Location handling
  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Геолокэйшн идэвхгүй байна');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
        setLocationError('');
      },
      (error) => {
        setLocationError('Байршил тогтоох боломжгүй байна');
        console.error('Location error:', error);
      }
    );
  }, []);

  // Image preview rotation
  useEffect(() => {
    if (formData.images.length > 1) {
      const timer = setInterval(() => {
        setPreviewIndex((prev) => 
          prev === formData.images.length - 1 ? 0 : prev + 1
        );
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [formData.images]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsSubmitting(false);
        setFormData({
          title: '',
          description: '',
          targetAmount: '',
          images: [],
          category: 'dog',
          location: null,
        });
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      console.error('Error:', error);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type.startsWith('image/')
    );
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <PageWrapper>
      <CreatePostContainer
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showSuccess ? (
          <SuccessMessage
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessIcon>✓</SuccessIcon>
            <SuccessText>Пост амжилттай үүслээ!</SuccessText>
          </SuccessMessage>
        ) : (
          <>
            <Title>Хандивын пост үүсгэх</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Гарчиг</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                  required
                  placeholder="Гарчиг оруулна уу"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="description">Дэлгэрэнгүй мэдээлэл</Label>
                <TextArea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                  required
                  placeholder="Дэлгэрэнгүй мэдээлэл оруулна уу"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label htmlFor="targetAmount">Хандивын дүн</Label>
                  <Input
                    type="number"
                    id="targetAmount"
                    name="targetAmount"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      targetAmount: e.target.value
                    }))}
                    required
                    min="0"
                    placeholder="0₮"
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="category">Ангилал</Label>
                  <Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      category: e.target.value
                    }))}
                    required
                  >
                    <option value="dog">Нохой</option>
                    <option value="cat">Муур</option>
                    <option value="other">Бусад</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <LocationSection>
                <Label>Байршил</Label>
                <LocationButton 
                  type="button"
                  onClick={getLocation}
                  $hasLocation={!!formData.location}
                >
                  <MapPin size={20} />
                  {formData.location 
                    ? 'Байршил сонгогдсон'
                    : 'Байршил сонгох'}
                </LocationButton>
                {locationError && (
                  <LocationError>
                    <AlertCircle size={16} />
                    {locationError}
                  </LocationError>
                )}
              </LocationSection>

              <FormGroup>
                <Label>Зураг оруулах</Label>
                <FileUploadBox
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  $isDragging={dragActive}
                >
                  <Upload size={24} />
                  <FileUploadText>
                    <span>Энд дарж</span> эсвэл зургаа чирж оруулна уу
                  </FileUploadText>
                  <FileUploadInput
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                  />
                </FileUploadBox>

                <AnimatePresence>
                  {formData.images.length > 0 && (
                    <ImagePreviewGrid
                      as={motion.div}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {formData.images.map((image, index) => (
                        <ImagePreviewItem
                          key={index}
                          as={motion.div}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ImagePreview src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                          <RemoveImageButton onClick={() => removeImage(index)}>
                            <X size={16} />
                          </RemoveImageButton>
                          <ImageName>{image.name}</ImageName>
                        </ImagePreviewItem>
                      ))}
                    </ImagePreviewGrid>
                  )}
                </AnimatePresence>
              </FormGroup>

              <SubmitButton 
                type="submit"
                disabled={isSubmitting}
                $isSubmitting={isSubmitting}
              >
                {isSubmitting ? (
                  <LoadingSpinner />
                ) : (
                  'Пост үүсгэх'
                )}
              </SubmitButton>
            </Form>
          </>
        )}
      </CreatePostContainer>
    </PageWrapper>
  );
};

// Animations
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Add your existing styled components here and update/add these new ones:

const LocationSection = styled.div`
  margin-bottom: 24px;
`;

const LocationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasLocation ? '#2F7169' : '#eee'};
  border-radius: 12px;
  background: ${props => props.$hasLocation ? 'rgba(47, 113, 105, 0.1)' : 'white'};
  color: ${props => props.$hasLocation ? '#2F7169' : '#666'};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #2F7169;
    background: rgba(47, 113, 105, 0.05);
  }
`;

const LocationError = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SuccessMessage = styled.div`
  text-align: center;
  padding: 40px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: #f0f9f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: #2F7169;
`;

const SuccessText = styled.h2`
  color: #2F7169;
  font-size: 1.8rem;
  margin: 0;
`;

// Update your existing styled components with these enhancements:

const ImagePreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const ImagePreviewItem = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

// ... rest of your styled components

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const CreatePostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #2F7169;
    box-shadow: 0 0 0 3px rgba(47, 113, 105, 0.1);
  }
`;

const FileUploadBox = styled.div`
  border: 2px dashed ${props => props.$isDragging ? '#2F7169' : '#eee'};
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  background: ${props => props.$isDragging ? 'rgba(47, 113, 105, 0.05)' : 'white'};
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: #2F7169;
    background: rgba(47, 113, 105, 0.05);
  }
`;

const FileUploadText = styled.p`
  color: #666;
  margin-top: 12px;

  span {
    color: #2F7169;
    font-weight: 500;
  }
`;

const FileUploadInput = styled.input`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ImageName = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubmitButton = styled.button`
  background: #2F7169;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #245a52;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export default CreatePost; 