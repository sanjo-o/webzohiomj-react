import React from 'react';
import styled from 'styled-components';

const Search = () => {
  return (
    <PageContainer>
      <h1>Хайлт</h1>
      {/* Add your search functionality here */}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
  padding: 120px 20px 40px;
  background-color: #f5f5f5;
`;

export default Search; 