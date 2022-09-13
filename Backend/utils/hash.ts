import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword:string) {
    const hashPassword = await bcrypt.hash(plainPassword,SALT_ROUNDS);
    return hashPassword
}

export async function checkPassword(plainPassword:string, hashedPassword: string) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}