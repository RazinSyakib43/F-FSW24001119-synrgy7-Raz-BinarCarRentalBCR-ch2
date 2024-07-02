import bcrypt from "bcryptjs";

const salt = 10;

export async function encryptPassword(password: string) {
    try {
        const result = await bcrypt.hash(password, salt);
        return result;
    } catch (e) {
        return e;
    }
}

export async function checkPassword(
    encryptedPassword: string,
    password: string
) {
    try {
        const result = await bcrypt.compare(password, encryptedPassword);
        return result;
    } catch (e) {
        return e;
    }
}
