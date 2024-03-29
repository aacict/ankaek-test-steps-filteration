import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const jwtSchema = new mongoose.Schema(
  {
      jwt: {
        type: String,
        required: true,
      },
      user_id: { 
        type: Schema.Types.ObjectId,
         ref: 'User', 
         required: true
        },
      expires_at: {
        type: Date,
        required: true,
      },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
 
export default mongoose.model('Jwt', jwtSchema);