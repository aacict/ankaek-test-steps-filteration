import mongoose from 'mongoose';
const Schema = mongoose.Schema;
 
const notificationSchema = new mongoose.Schema(
  {
      user_id: { 
        type: Schema.Types.ObjectId,
         ref: 'User', 
         required: true
        },
      expires_at: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 300
      },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
 
export default mongoose.model('Notification', notificationSchema);