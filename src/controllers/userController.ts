  import { Request, Response } from "express";
  import UsersService from "../services/userService";

  class UserController {
    public static async register(req: Request, res: Response) {
      try {
        const { name, email, username, password } = req.body;

        const user = await UsersService.register(
          name,
          email,
          username,
          password
        );

        return res.status(201).json({
          message: "User registered successfully",
          user
        });
      } catch (error: any) {
        return res.status(400).json({
          message: error.message
        });
      }
    }

    public static async login(req: Request, res: Response) {
      try {
        const { email, username, password } = req.body;

        const result = await UsersService.login(
          email,
          username,
          password
        );

        return res.status(200).json({
          message: "Login successful",
          user:result.user,
          accessToken : result.accessToken,
          refreshToken : result.refreshToken
        });
      } catch (error: any) {
        return res.status(400).json({
          message: error.message
          
        });
      }
    }

    public static async getAllUsers(req: Request, res: Response) {
      try {
        const users = await UsersService.getAllUsers();

        return res.status(200).json({
          users
        });
      } catch (error: any) {
        return res.status(400).json({
          message: error.message
        });
      }
    }

    public static async getUserById(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);

        const user = await UsersService.getUserById(id);

        return res.status(200).json({
          user
        });
      } catch (error: any) {
        return res.status(404).json({
          message: error.message
        });
      }
    }

    public static async updateUser(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);

        const { name, email, username } = req.body;

        const user = await UsersService.updateUser(
          id,
          name,
          email,
          username
        );

        return res.status(200).json({
          message: "User updated successfully",
          user
        });
      } catch (error: any) {
        return res.status(400).json({
          message: error.message
        });
      }
    }

    public static async deleteUser(req: Request, res: Response) {
      try {
        const id = Number(req.params.id);

        await UsersService.deleteUser(id);

        return res.status(200).json({
          message: "User deleted successfully"
        });
      } catch (error: any) {
        return res.status(404).json({
          message: error.message
        });
      }
    }
    public static async refreshToken(req:Request, res:Response){
      const{refreshToken}= req.body
      const result = await UsersService.refreshToken(refreshToken);
      return res.status(200).json({
  accessToken: result})


    }
  }

  export default UserController;