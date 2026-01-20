import bcrypt from "bcryptjs";

/**
 * Configuration for password hashing
 * OWASP recommends a minimum of 10 rounds, but 12 is better for 2024+
 * Each increment doubles the time required to hash
 */
const SALT_ROUNDS = 12;

/**
 * Minimum password length for security
 */
const MIN_PASSWORD_LENGTH = 8;

/**
 * Maximum password length to prevent DoS attacks
 */
const MAX_PASSWORD_LENGTH = 128;

/**
 * Hash a plain text password with bcrypt
 * @param plainPassword - The plain text password to hash
 * @returns Promise resolving to the hashed password
 * @throws Error if password validation fails or hashing fails
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  // Input validation
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Password must be a non-empty string");
  }

  if (plainPassword.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
    );
  }

  if (plainPassword.length > MAX_PASSWORD_LENGTH) {
    throw new Error(
      `Password must not exceed ${MAX_PASSWORD_LENGTH} characters`,
    );
  }

  try {
    // Generate salt and hash password in one step
    const hashedPassword = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw new Error(
      `Failed to hash password: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

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

/**
 * Check if a hash needs to be rehashed (e.g., if salt rounds have increased)
 * @param hashedPassword - The hashed password to check
 * @returns Promise resolving to true if rehashing is recommended
 */
export async function needsRehash(hashedPassword: string): Promise<boolean> {
  try {
    const rounds = await bcrypt.getRounds(hashedPassword);
    return rounds < SALT_ROUNDS;
  } catch (error) {
    console.error("Error checking hash rounds:", error);
    return false;
  }
}

// (async () => {
//   try {
//     const pass = await hashPassword("HelloWorld!");
//     console.log("The password hash is", pass);
//   } catch (error) {
//     console.log("Error occured while creating hash", error);
//   }
// })();

async function runCLI() {
  const args = process.argv.slice(2);

  // Supports: -p password OR --password password
  const passwordIndex =
    args.indexOf("-p") !== -1 ? args.indexOf("-p") : args.indexOf("--password");

  if (passwordIndex === -1 || !args[passwordIndex + 1]) {
    console.error("Usage: ts-node file.ts -p <password>");
    process.exit(1);
  }

  const plainPassword = args[passwordIndex + 1];

  try {
    const hash = await hashPassword(plainPassword);
    console.log("Hashed password:");
    console.log(hash);
  } catch (err) {
    console.error(
      "Error:",
      err instanceof Error ? err.message : "Unknown error",
    );
    process.exit(1);
  }
}

runCLI();
