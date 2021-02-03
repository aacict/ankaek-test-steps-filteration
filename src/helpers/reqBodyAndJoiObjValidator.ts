
const validateData = async (data, JoiSchema, errors, res, next) => {
      try {
        const response = await JoiSchema.validate(data);
        if (response.error) {
          await Promise.all(
              response.error.details.map(async (errDetail)=> {
                errors[errDetail.context.label] = errDetail.message;
              }),
          );
        }
        const errorKeys = Object.keys(errors);
        if (errorKeys.length != 0) {
          return res.status(400).json({status:false, message:errors, status_code:400})
        } else {
          console.log('BODY_VALIDATED');
          next();
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({status:false, message:'SERVER_ERROR', status_code:500});
      }
    }

  export default validateData;