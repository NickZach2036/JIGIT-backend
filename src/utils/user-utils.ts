import bcrypt from "bcrypt";
import { sequelize, User } from "../models";

async function createUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });
    console.log("New user created:", newUser.toJSON());
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function dropTable() {
  try {
    await sequelize.drop();
    console.log("Table dropped successfully.");
  } catch (error) {
    console.error("Error dropping table:", error);
    throw error;
  }
}

async function deleteUser(userId: string) {
  try {
    await User.destroy({
      where: {
        id: userId,
      },
    });
    console.log(`User with id ${userId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 6;
};

const validateEmailOrFail = (email: string) => {
  if (!validateEmail(email)) {
    throw new Error("Invalid email format.");
  }
};

const validatePasswordOrFail = (password: string) => {
  if (!validatePassword(password)) {
    throw new Error("Password must be at least 6 characters long.");
  }
};

export {
  createUser,
  dropTable,
  deleteUser,
  syncDatabase,
  validateEmail,
  validatePassword,
  validatePasswordOrFail,
  validateEmailOrFail,
};
