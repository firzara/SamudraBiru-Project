import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? element : <Navigate to='/masuk' />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
