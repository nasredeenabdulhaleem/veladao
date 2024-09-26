// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
// import { LOGOUT, LOGIN_SUCCESS } from '../redux/constants/authConstants';

// const useAuthCheck = () => {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const decodedToken = jwtDecode(token);
//                 console.log('Decoded Token:', decodedToken); // Add logging
//                 if (decodedToken.exp * 1000 < Date.now()) {
//                     console.log('Token expired'); // Add logging
//                     localStorage.removeItem('token');
//                     dispatch({ type: LOGOUT });
//                 } else {
//                     dispatch({ type: LOGIN_SUCCESS, payload: decodedToken });
//                     console.log('Token valid'); // Add logging
//                 }
//             } catch (error) {
//                 console.error('Token decoding failed', error); // Add logging
//                 localStorage.removeItem('token');
//                 dispatch({ type: LOGOUT });
//             }
//         }
//     }, [dispatch]);
// };

// export default useAuthCheck;