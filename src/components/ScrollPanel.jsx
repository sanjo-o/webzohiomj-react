import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ScrollPanel = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const currentRef = panelRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Panel ref={panelRef} className={isVisible ? 'visible' : ''}>
      {children}
    </Panel>
  );
};

const Panel = styled.div`
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default ScrollPanel; 