import jwt from "jsonwebtoken";

class JwtService {
  public static generateAccessToken(userId: number) {
    return jwt.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
  }

  public static generateRefreshToken(userId: number) {
    return jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: "7d" }
    );
  }

  public static verifyRefreshToken(token:string){
    return jwt.verify(token,process.env.JWT_REFRESH_SECRET!)
  }
}

export default JwtService;