import * as fs from "fs/promises";

const USERS_JSON_URL = new URL("./users.json", import.meta.url);

async function readUsersFile() {
    const usersTxt = await fs.readFile(USERS_JSON_URL, "utf-8");
    return JSON.parse(usersTxt);
}

async function writeUsersFile(users) {
    await fs.writeFile(USERS_JSON_URL, JSON.stringify(users, null, 2));
}

export async function getAllUsers() {
    try {
        return await readUsersFile();
    } catch (err) {
        console.log(err);
    return [];
    }
}

export async function findUserByUsername(username) {
    const users = await getAllUsers();
    const normalizedUsername = username?.toString().trim().toLowerCase();

    return users.find((user) => {
        const currentUsername = user.username?.toString().trim().toLowerCase();
        return currentUsername === normalizedUsername;
    });
}

export async function registerUser(userData) {
    const users = await getAllUsers();
    const normalizedEmail = userData.email?.toString().trim().toLowerCase();

    const alreadyExists = users.some((user) => {
        const currentUsername = user.username?.toString().trim().toLowerCase();
        return currentUsername === normalizedEmail;
    });

    if (alreadyExists) {
        return "already_exists";
    }

    const newUser = {
        fname: userData.firstName,
        lname: userData.lastName,
        username: normalizedEmail,
        password: userData.password,
        basket: [],
    };

    users.push(newUser);
    await writeUsersFile(users);

    return newUser;
}