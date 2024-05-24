const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    status : { type: Boolean, default: true },
    municipality: { type: String, default: "xoxo"},
    profilePicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IncidentFile",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

exports.User = model("User", UserSchema);
