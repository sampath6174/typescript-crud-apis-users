import bcrypt from "bcrypt";
import { Op } from "sequelize";
import User from "../models/userModel";
import JwtService from "../utils/jwt";

class UsersService {
  public static async register(
    name: string,
    email: string,
    username: string,
    password: string,
  ) {
    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const existingUsername = await User.findOne({
      where: { username },
    });

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    let admin_number: number;
    let existingAdminNumber;

    do {
      admin_number = Math.floor(100000 + Math.random() * 900000);

      existingAdminNumber = await User.findOne({
        where: { admin_number },
      });
    } while (existingAdminNumber);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      admin_number,
    });

    const { password: _password, ...data } = user.toJSON();

    return { data };
  }

  public static async login(
    email: string | undefined,
    username: string | undefined,
    password: string,
  ) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          ...(email ? [{ email }] : []),
          ...(username ? [{ username }] : []),
        ],
      },
    });

    if (!user) {
      throw new Error("Invalid email/username or password");
    }

    const storedPassword = user.get("password") as string;

    const passwordMatch = await bcrypt.compare(password, storedPassword);

    if (!passwordMatch) {
      throw new Error("Invalid email/username or password");
    }
    const userData = user.toJSON();

    const { password: _password, ...data } = user.toJSON();
    const userId = user.get("id") as number;
    const accessToken = JwtService.generateAccessToken(userId);

    const refreshToken = JwtService.generateRefreshToken(userId);

    return { user: data, accessToken, refreshToken };
  }

  public static async getAllUsers() {
    const users = await User.findAll();

    const userData = users.map((user) => {
      const data = user.toJSON();

      const { password: _password, ...userData } = user.toJSON();

      return userData;
    });

    return { users: userData };
  }

  public static async getUserById(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const userData = user.toJSON();

    const { password: _password, ...data } = user.toJSON();

    return { data };
  }

  public static async updateUser(
    id: number,
    name: string,
    email: string,
    username: string,
  ) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.update({
      name,
      email,
      username,
    });

    const userData = user.toJSON();

    const { password: _password, ...data } = user.toJSON();

    return { data };
  }

  public static async deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.destroy();

    const userData = user.toJSON();

    const { password: _password, ...data } = user.toJSON();

    return { data };
  }

  public static async refreshToken(refreshToken: string) {

    const decoded = JwtService.verifyRefreshToken(refreshToken)
    const userId = (decoded as {userId:number}).userId
    const accessToken = JwtService.generateAccessToken(userId);
    return accessToken
}
}

export default UsersService;
