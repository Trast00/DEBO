import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoTracking = ({isTester}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set localStorage value
    if (isTester) {
      localStorage.setItem('isTester', 'true');
  
      // Display a popup message
      alert('You are now excluded from tracking. You are a Tester (Vous êtes un tester maintenant)');
    } else {
      localStorage.removeItem('isTester')
      alert('You are now included in tracking. You are a Tester (Vous n êtes plus un tester');

    }

    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return null; // No need to render anything for this route
};

export default NoTracking;
