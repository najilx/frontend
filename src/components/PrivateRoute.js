import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../auth';

export default function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}
