import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  email: string;
  role: "admin" | "user";
}

const UserSchema = new mongoose.Schema<Users>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.models.User ||
  mongoose.model<Users>("User", UserSchema);
