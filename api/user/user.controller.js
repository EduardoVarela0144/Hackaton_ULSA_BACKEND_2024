const { User } = require("./User");
const bcrypt = require("bcryptjs");
const { saveS3ImageUser } = require("../../services/saveS3ImageUser");
const { showS3File } = require("../../services/showS3File");


exports.createUser = async (req, res) => {
  try {

    const {
      name,
      lastName,
      email,
      password,
      phone,
    } = req.body;


    const incidentImages = req.files.images;

    let incidentFilesArray = [];

    const nameProfilePicture = `${name}_${lastName}`
    if (incidentImages) {
      incidentFilesArray = await saveS3ImageUser(incidentImages, nameProfilePicture);
    }

    const user = new User({
      lastName,
      name,
      email,
      password,
      phone,
      profilePicture: incidentFilesArray[0],
    });


    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();


    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });



    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};
