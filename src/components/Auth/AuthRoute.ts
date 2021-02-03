import AuthController from './AuthController'
import validation from '../../helpers/inputValidation'

const routes = (router, verifyjwt) => {
  //sign in route
  router.post("/sign-in", validation['signInValidation'], AuthController.signin);

  //sign up route
  router.post("/sign-up", validation['signUpValidation'], AuthController.signup);

  //log out route
  router.get(
    "/logout",
    verifyjwt,
    AuthController.logout
  );
};

export default routes;