import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the Profile document
interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password:string;
  recipes: Types.ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the Profile document
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipes',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// set up pre-save middleware to create password
userSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User = model<IUser>('Users', userSchema);

export default User;
