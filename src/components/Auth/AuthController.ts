import jwtGeneration from '../../helpers/jwtGeneration';
import {User, UserVerificationToken} from '../../models'
const services = {
    signin:async(req, res, next) => {
        try {
            const user: any = await User.findOne({
             email: req.body['email'].trim(),
            });
            const sendTokenResponse = async () => {
                const tokens = await jwtGeneration(user);
                return res.status(200).json({status:false, message:'login successful', status_code:200, tokens});
              };
              if(user){
               return await user.comparePassword(req.body['password']) ?
                await sendTokenResponse():
                await res.status(400).json({status:false, message:'password not match', status_code:400})
              }
              return res.status(404).json({status:false, message:'User does not exists', status_code:404});
           
          } catch (error: any) {
            console.log(error);
            return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
          }
  },
    signup:async (req, res, next) => {
        try {
          const user: any = new User({
          email: req.body['email'].trim(),
          password: req.body['password'],
        })
           await user.save();
           const token: number = await Math.floor(1000 + Math.random() * 9000);
           const newToken = new UserVerificationToken({
            token,
            user_id: user['_id']
        })
        await newToken.save();
        return res.status(200).json({status:true, message:'User added successfully', status_code:200});
        } catch (error) {
          console.log(error);
          return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },
    logout:async (req: any, res: any, next: any) => {
        try {
            await req.user.remove();
            return res.status(200).json({status:true, message:'logout successfull', status_code:200});
        } catch (error: any) {
          console.log(error);
          return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },
}
export default services;