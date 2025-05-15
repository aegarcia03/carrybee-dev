const userService = require('../services/userService');

// Register User
const registerUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { token, user } = await userService.loginUser(req.body); // Assume loginUser returns both
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

//Get user by 
const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json(user); // Ensure this is the modified user object
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Update user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const deletedMessage = await userService.deleteUser(req.params.id);
    res.status(200).json(deletedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
  };