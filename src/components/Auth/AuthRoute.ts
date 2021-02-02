import AuthController from './AuthController'

const routes = (router, verifyjwt) => {
  //sign in route
  router.post("/sign-in", AuthController.signin);

  //sign up route
  router.post("/sign-up", AuthController.signup);

  //log out route
  router.get(
    "/logout",
    verifyjwt,
    AuthController.logout
  );
};

export default routes;