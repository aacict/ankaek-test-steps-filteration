import {User, UserStep, Notification} from '../../models'
import moment from 'moment'

const notifyUser = async (req) => {
          const notification: any = new Notification({
              user_id: req.user['user_id']
          })
          await notification.save();
}

const getSteps = async(user_id, startDate, endDate) => {
  const userStepsBtwn = await UserStep.find( {
    user_id, 
    created_at: {$gte: startDate, $lte: endDate}
   });
   let count: number = 0;
   await Promise.all(
    userStepsBtwn.map(async(userStep) => {
       count = count + userStep['steps']
     })
   )
   return count;
}

const services = {
    addUserStep:async(req, res, next) => {
        try {
          const userStep = await UserStep.findOne({
            user_id: req.user['user_id'], 
            created_at: {
               $gte: moment().startOf('day'),
               $lte: moment().endOf('day')
              }
        })
        if(req.body['steps'] >= 10000){
          await notifyUser(req);
        }
           if(userStep){
              userStep['steps'] = req.body['steps'];
              await userStep.save();
           }else{
              const newUserStep = new UserStep({
             steps: req.body['steps'],
             user_id: req.user['user_id'],
             created_at:  moment(req.body['test_date'])
           });
           await newUserStep.save();
           }
          
           return res.status(200).json({status:true, message:'Step updated', status_code:200});
          } catch (error) {
            console.log(error);
            return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
          }
  },
    getUserSteps:async (req, res, next) => {
        try {
          const user_id = req.user['user_id'];
          let startDate =   moment().startOf('day');
          let endDate =   moment().endOf('day');
          const userStepsToday = await getSteps(user_id, startDate, endDate);

          startDate =   moment().subtract(1,'d').startOf('day');
          endDate =   moment().subtract(1,'d').endOf('day');
          const userStepsYesterday = await getSteps(user_id, startDate, endDate);

          startDate =  moment().startOf('week');
          endDate =   moment().endOf('week');
          const userStepsThisWeek = await getSteps(user_id, startDate, endDate);

          startDate = moment().startOf('week').subtract(1,'w');
          endDate =  moment().startOf('week').subtract(1,'ms');
          const userStepsLastWeek = await getSteps(user_id, startDate, endDate);

          startDate = moment().startOf('month');
          endDate =   moment().endOf('month');
          const userStepsThisMonth = await getSteps(user_id, startDate, endDate);

          startDate =  moment().startOf('month').subtract(1,'M');
          endDate =   moment().startOf('month').subtract(1,'ms');
          const userStepslastMonth = await getSteps(user_id, startDate, endDate);

          startDate =  moment().startOf('year');
          endDate =   moment().endOf('year');
          const userStepsThisYear = await getSteps(user_id, startDate, endDate);

          return res.status(200).json({
             status:false,
             message:'steps data',
             status_code:200,
             data: {
               userStepsToday,
               userStepsYesterday,
               userStepsThisWeek,
               userStepsLastWeek,
               userStepsThisMonth,
               userStepslastMonth,
               userStepsThisYear
             }
            });
            
        } catch (error) {
          console.log(error);
          return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
        }
  },

}
export default services;