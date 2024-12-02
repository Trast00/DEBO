import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoTracking = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set localStorage value
    localStorage.setItem('isTester', 'true');

    // Display a popup message
    alert('You are now excluded from tracking.');

    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything for this route
};

export default NoTracking;
