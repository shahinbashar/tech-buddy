import { compare, hash } from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

/** bcrypt hash of a random string; used to equalize login timing for unknown emails. */
const DUMMY_PASSWORD_HASH = '$2b$12$Bzxm.cm5lmuJuX6orm5P9uFL/VIhWl1WYOZpJVRJ6S1dqvAn6cltK';

export function hashPassword(plain: string): Promise<string> {
  return hash(plain, BCRYPT_ROUNDS);
}

/**
 * Always runs bcrypt — against a dummy hash when there is no stored hash — so the response
 * time does not reveal whether an account exists.
 */
export function verifyPassword(
  plain: string,
  storedHash: string | null | undefined,
): Promise<boolean> {
  return compare(plain, storedHash ?? DUMMY_PASSWORD_HASH).then((ok) => ok && Boolean(storedHash));
}
