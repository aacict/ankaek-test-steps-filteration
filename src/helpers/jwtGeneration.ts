import crypto from 'crypto';
import {Jwt} from '../models/index';
import moment from 'moment';

const jwtGeneration = async (user) => {
  const token = await getUniqueToken();
  const jwtLifeTime = moment().add(1, 'd');
  const newJwt = new Jwt({
    jwt : token,
    user_id: user._id,
    expires_at: jwtLifeTime,
  });
  await newJwt.save()
  return {
    user,
    access_token: newJwt['jwt'],
    expires_at: jwtLifeTime,
    token_type: 'Bearer',
  };
};

export default jwtGeneration;
/**
 */
const getUniqueToken = async () => {
  const jwt = crypto.randomBytes(32).toString('hex');
  const jwtExists = await Jwt.findOne({jwt});
  return !jwtExists ? jwt :  getUniqueToken()
};