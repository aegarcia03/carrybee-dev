const userService = require('../services/userService');

// Create User
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get user by Email
const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    res.status(200).json(user);
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
    createUser,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
  };