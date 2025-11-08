/**
 * Decodes a JWT token and returns the payload claims.
 * @param token - The JWT token string.
 * @returns The decoded payload as a JSON object.
 * @throws Error if the token is invalid.
 */
export function decodeJwt(token: string): any {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT: Token must have exactly 3 parts');
    }

    const payload = parts[1];
    // Replace base64url characters with base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // Decode base64
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    // Parse JSON
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error(`Failed to decode JWT: ${error.message}`);
  }
}

/**
 * Extracts the 'permissions' claim from a decoded JWT payload.
 * @param decodedToken - The decoded JWT payload.
 * @returns The permissions array or null if not found.
 */
export function getPermissionsFromToken(decodedToken: any): string[] | null {
  return decodedToken?.permissions || null;
}