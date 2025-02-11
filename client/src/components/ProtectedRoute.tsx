import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = () => {
  const { user } = useUserContext();

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;