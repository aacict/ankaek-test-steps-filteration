import jwtGeneration from '../../helpers/jwtGeneration';
import {User} from '../../models'
const services = {
    signin:async(req, res, next) => {
        try {
            const user: any = await User.findOne({
             email: req.body['email'].trim(),
            });
            const sendTokenResponse = async () => {
                const tokens = await jwtGeneration(user);
                return res.json({status:false, message:'login successful', status_code:200, tokens});
              };
              user ?
              await user.comparePassword(req.body['password']) ?
              await sendTokenResponse():
              await res.json({status:false, message:'password not match', status_code:400}) :
              await res.json({status:false, message:'SERVER_ERROR', status_code:500});
           
          } catch (error) {
            console.log(error);
            return res.json({status:false, message:'SERVER_ERROR', status_code:500});
          }
  },
    signup:async (req, res, next) => {
        try {
          const user: any = new User({
          email: req.body['email'].trim(),
          password: req.body['password'],
        })
           await user.save();
           await res.json({status:true, message:'User added successfully', status_code:200});
        } catch (error) {
          console.log(error);
          return res.json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },
    logout:async (req, res, next) => {
        try {
            await req.user.remove();
            return res.json({status:true, message:'logout successfull', status_code:200});
        } catch (error) {
          console.log(error);
          return res.json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },
}
export default services;