import Joi from '@hapi/joi'
import validateData from '../helpers/reqBodyAndJoiObjValidator'
import {User} from '../models'


const dbSameEmailError = async (email, errors) => {
    const user = await User.findOne({email});
    if(user){
      errors['email'] = 'USER_EMAIL_EXISTS'
    }
    return errors;
  }

const validation = {
  // Sign-in validation
  signInValidation: async (req, res, next) => {
    try {
      const JoiSchema = await Joi.object({
        email: Joi.string()
            .regex(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
            .rule({
              message: 'INVALID_EMAIL',
            })
            .required(),
        password: Joi.string()
            .required(),
      }).options({abortEarly: false});
      await validateData(req.body, JoiSchema, {}, res, next);
    } catch (error) {
      console.log(error);
      return res.status(500).json(false, 'SERVER_ERROR', 500, '', {}, res);
    }
  },
  // Sign-up validation
  signUpValidation: async (req, res, next) => {
      try {
        let errors = {};
        errors = await dbSameEmailError(req.body['email'], errors)
        const JoiSchema = await Joi.object({
          email: Joi.string()
              .regex(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
              .rule({
                message: 'INVALID_EMAIL',
              })
              .required(),
          password: Joi.string()
              .regex(/^[\x20-\x7E]+$/)
              .rule({
                message: 'INVALID_PASS',
              })
              .required(),
        }).options({abortEarly: false});
        await validateData(req.body, JoiSchema, errors, res, next);
      } catch (error) {
        console.log(error);
        return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
      }
  },  
};

export default validation;
