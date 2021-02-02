import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
 
const userSchema = new mongoose.Schema(
  {
      email: {
        type: String,
        required: true,
      },
      password: { 
        type: String,
        required: true
        },
      email_verified: { 
        type: Boolean,
        default: false
        },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  userSchema.pre("save", function(next){
    const user: any = this;
    if(!user.isModified("password") || !user.password) {
        return next();
    }
    user.password = bcrypt.hashSync(user.password, 10);
    next();
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  const user: any = this;
    if(!candidatePassword || !user.password){
        return false;
    }
        return bcrypt.compare(candidatePassword, user.password);
}
 
export default mongoose.model('User', userSchema);