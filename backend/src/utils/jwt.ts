import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1h",
  });
}

export function generateRefreshToken(userId: string, tokenId: string) {
  return jwt.sign({ userId, tokenId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  });
}

export function generatePasswordResetToken(userId: string): string {
  const secret = process.env.JWT_PASSWORD_RESET_SECRET || process.env.JWT_ACCESS_SECRET!;
  return jwt.sign({ userId, type: "password_reset" }, secret, {
    expiresIn: "1h",
  });
}

export function verifyPasswordResetToken(token: string): any {
  try {
    const secret = process.env.JWT_PASSWORD_RESET_SECRET || process.env.JWT_ACCESS_SECRET!;
    const decoded = jwt.verify(token, secret) as any;

    if (decoded.type !== "password_reset") return null;

    return decoded;
  } catch (err) {
    return null;
  }
}