const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },//Nombre
    lastName: { type: String, required: true },//ApellidoPaterno
    middleName: { type: String, required: true },//ApellidoMaterno
    email: { type: String, required: true, unique: true },//Correo
    password: { type: String, required: true },//Contraseña
    registrationNumber: { type: String, required: false },//Matricula
    accountNumber: { type: String, required: false },//Numero de cuenta bancaria
    profilePicture: { type: String, required: false },//Foto de perfil
    major: { type: String, required: false },//Carrera
    building: { type: String, required: false },//Edificio
    rol: { type: String, required: true },//Rol
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
