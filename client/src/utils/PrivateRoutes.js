import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoutes = () => {
    const { active } = useAuth();

    return active ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
