import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;
 
const userVerificationTokenSchema = new mongoose.Schema(
  {
      token: {
        type: Number,
        required: true,
      },
      user_id: { 
        type: Schema.Types.ObjectId,
         ref: 'User', 
         required: true
        },
      expires_at: {
          type: Date,
          default: moment().add(1, 'h'),
          required: true
      }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
 
export default mongoose.model('UserVerificationToken', userVerificationTokenSchema);