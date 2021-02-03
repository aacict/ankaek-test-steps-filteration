import UserController from './userController'

const routes = (router, verifyjwt) => {
  router.post("/steps", verifyjwt,  UserController.addUserStep);

  router.get("/steps", verifyjwt, UserController.getUserSteps);

};

export default routes;