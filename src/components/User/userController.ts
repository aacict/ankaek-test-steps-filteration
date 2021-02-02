import {User, UserSteps, Notification} from '../../models'
const services = {
    addUserStep:async(req, res, next) => {
        try {
          
           
          } catch (error) {
            console.log(error);
            return res.json({status:false, message:'SERVER_ERROR', status_code:500});
          }
  },
    getUserSteps:async (req, res, next) => {
        try {
            
            
        } catch (error) {
          console.log(error);
          return res.json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },
  notifyUser: async (req, res, next) => {
    try {
            const notification: any = new Notification({
                user_id: req.user['_id']
            })
            await notification.save();
    } catch (error) {
      console.log(error);
      return res.json({status:false, message:'SERVER_ERROR', status_code:500});
    }
  }
}
export default services;