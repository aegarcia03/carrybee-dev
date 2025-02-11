const prisma = require('../prismaClient');
const bcrypt = require('bcrypt');
const validator = require('validator')

// Create User
const createUser = async (userData) => {
  try {
    const { first_name, last_name, phone, email, password, address } = userData
    
    // Validate email format
    if (!validator.isEmail(email)) {
      throw new Error('Invalid email address');
    }
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email }});
    if (existingUser) {
      throw new Error ('Email already registered');
    }
    // Check if phone number already exists
    const existingPhone = await prisma.user.findUnique({ where: { phone }});
    if (existingPhone) {
      throw new Error ('Phone number already registered');
    }
    //Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            first_name,
            last_name,
            phone,
            email,
            password: hashedPassword,
            address,
            },
      });
    // Return the result to controller
    return { message: 'User created successfully', user: newUser };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
    } catch (error) {
      throw new Error(error.message);
    }
};

// Get All Users
const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error('Failed to get all users');
  }
};

// Update user
const updateUser = async (id, updateData) => {
  try {
    const { first_name, last_name, phone, email, address } = updateData;
    
    //Validate email format if it's provided
    if (email && !validator.isEmail(email)) {
        throw new Error('Invalid email address');
    }
    //Check if email is being updated and if it is already taken 
    if (email) {
      const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail && existingEmail.id !== id) { // Make sure is not the same user
      throw new Error('Email already registered');
      }
    }
    // Check if phone number is being updated and if it's already taken by another user
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone }});
      if (existingPhone && existingPhone.id !== id) { //Make sure is not the same user
        throw new Error('Phone number already registered');
      }
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        first_name: first_name || undefined, // If the value is provided, use it, otherwise skip it
        last_name: last_name || undefined,
        phone: phone || undefined,
        email: email || undefined,            
        address: address || undefined,
        },
    });
    
    return updatedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    await prisma.user.delete({ where: { id }});
    return {message: 'User deleted successfully'};
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

module.exports = {
    createUser,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
  };