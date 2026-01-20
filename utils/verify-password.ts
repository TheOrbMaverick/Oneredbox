import bcrypt from "bcryptjs";

/**
 * Verify a plain text password against a hashed password
 * Uses timing-safe comparison to prevent timing attacks
 * @param plainPassword - The plain text password to verify
 * @param hashedPassword - The hashed password to compare against
 * @returns Promise resolving to true if passwords match, false otherwise
 */
export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  // Input validation
  if (!plainPassword || typeof plainPassword !== "string") {
    return false;
  }

  if (!hashedPassword || typeof hashedPassword !== "string") {
    return false;
  }

  try {
    // bcrypt.compare is timing-safe by default
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    // Log error but don't expose details to caller
    console.error("Password verification error:", error);
    return false;
  }
}
