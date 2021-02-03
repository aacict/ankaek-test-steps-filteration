import {User, Jwt} from '../models';

const verifyjwt = async (req, res, next) => {
    try {
        const token: string = req.headers['authorization'].split('bearer ')[1];
    if(token){
        const jwt: any = await Jwt.findOne({jwt: token});
        if(jwt){
            req['user'] = jwt;
           return next();
        }
        return res.status(401).json({status: false, message: 'unauthorized', status_code: 401});
    }
    return res.status(401).json({status: false, message: 'unauthorized', status_code: 401});  
    } catch (error) {
        console.log(error)
        return res.status(500).json({status: false, message: 'SERVER_ERROR', status_code: 500});  
    }
  
}
     

export default verifyjwt;