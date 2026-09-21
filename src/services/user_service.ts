import bcrypt from "bcrypt";
import User from "../models/user_model";

class UsersService {
  public static async register(
    name: string,
    email: string,
    username: string,
    password: string
  ) {
    // 1. Check if email already exists
    const existingEmail = await User.findOne({
      where: { email }
    });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    // 2. Check if username already exists
    const existingUsername = await User.findOne({
      where: { username }
    });

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // 3. Generate a random 6-digit admin number
    let adminNumber: number;
    let existingAdminNumber;

    do {
      adminNumber = Math.floor(100000 + Math.random() * 900000);

      existingAdminNumber = await User.findOne({
        where: { admin_number: adminNumber }
      });
    } while (existingAdminNumber);

    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the user
    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      admin_number: adminNumber
    });

    return user;
  }
}

export default UsersService;