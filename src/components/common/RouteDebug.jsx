import { useLocation } from 'react-router-dom';

const RouteDebug = () => {
  const location = useLocation();
  console.log('Current route:', location.pathname);
  return null;
};

export default RouteDebug; 