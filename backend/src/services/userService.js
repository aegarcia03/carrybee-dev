const prisma = require('../../prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  return createUser(req, res); // No need to duplicate logic
};

const loginUser = async (req) => {
  const { email, password } = req.body;

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;

      console.log(`🔄 Attempt ${attempt}: Looking up user ${email}`);

      // ✅ Simulate a transient DB error
      if (Math.random() < 0.7) {
        throw new Error('Simulated DB connection error');
      }
            
      // Retrieve user by email
      const user = await prisma.user.findUnique({ where: { email } });
      // Invalid login
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      // Generate JWT token with email included in the payload
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('✅ Login successful');
      return {
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
      };
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${error.message}`);
      
      // exit early on invalid credentials
      if (error.message === 'Invalid credentials') {
        throw error;
      }
      //Final attempr failed - bubble up
      if (attempt >= maxRetries) {
        throw new Error('Something went wrong. Please try again later.');
      }
      // optional delay before trying
      await new Promise((res) => setTimeout(res, 500));
    }
  }
};

// Create User
const createUser = async (userData) => {
  try {
    const { first_name, last_name, phone, email, password, address } = userData;
     // Use promise.all()

    const [ existingUser, existingPhone ] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { phone } })
    ]);

    if (existingUser) throw new Error('Email already registered');
    if (existingPhone) throw new Error ('Phone number already registered');
 
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
    return { message: 'User registered successfully', user: newUser };
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get user by email
const getUserByEmail = async (emai) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email, } });
    if (!user) {
      throw new Error('User not found');
    }
    // Create a new object excluding the password
    const userWithoutPassword = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      address: user.address,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return { user: userWithoutPassword }; // Return the new object
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all users
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  } catch (error) {
    throw new Error('Failed to get all users');
  }
};


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
    registerUser,
    loginUser,
  };
