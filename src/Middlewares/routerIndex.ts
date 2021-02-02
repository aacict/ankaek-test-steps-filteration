import {Router} from 'express';
// import {tokenAuthenticator} from 'express';

// const passport = require('passport');
// const authRoute = require('../components/Auth/authRoute');
// const userRoute = require('../components/User/userRoute');


module.exports = () => {
  const router = Router();

  //auth routes added to app router
//   authRoute(router, passport);
//   userRoute(router, passport);
  return router;
};
