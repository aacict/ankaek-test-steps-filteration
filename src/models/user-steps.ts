import {Schema, model} from 'mongoose';
// const Schema = mongoose.Schema;
 
const userStepSchema: Schema = new Schema(
  {
      steps: {
        type: Number,
        required: true,
      },
      user_id: { 
        type: Schema.Types.ObjectId,
         ref: 'User', 
        },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
 
export default model('userStep', userStepSchema);