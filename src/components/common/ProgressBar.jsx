import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
  return (
    <Container>
      <Progress width={progress} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 8px;
  background: #eee;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${props => props.width}%;
  height: 100%;
  background: #2F7169;
  transition: width 0.3s ease;
`;

export default ProgressBar;
