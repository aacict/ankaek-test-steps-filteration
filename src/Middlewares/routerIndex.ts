import {Router} from 'express';
import verifyjwt from './jwtVerify';
import authRoute from '../components/Auth/authRoute';
import userRoute from '../components/User/userRoute';


const router = () => {
  const router:any = Router();
  authRoute(router, verifyjwt);
  userRoute(router, verifyjwt);
  return router;
};

export default router;
