import {Router} from 'express';
import verifyjwt from './jwtVerify';
import authRoute from '../components/Auth/authRoute';
// const userRoute = require('../components/User/userRoute');


const router = () => {
  const router:any = Router();
  authRoute(router, verifyjwt);
//   userRoute(router, passport);
  return router;
};

export default router;
