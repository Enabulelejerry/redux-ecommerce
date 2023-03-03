import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';
import { useSelector,useDispatch } from 'react-redux';
const PrivateRoute = ({children}) => {
  const {user} = useSelector(store=>store?.user);
   if(!user){
    return <Navigate to='/' />
   }

   return children
};
export default PrivateRoute;
