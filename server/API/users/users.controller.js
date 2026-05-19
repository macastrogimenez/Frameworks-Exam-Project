import * as usersModel from "./users.model.js";

export async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const createdUser = await usersModel.registerUser({
      firstName,
      lastName,
      email,
      password,
    });

    if (createdUser === "already_exists") {
      return res.status(409).json({ error: "User already exists" });
    }

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await usersModel.findUserByUsername(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const safeUser = {
      firstName: user.fname,
      lastName: user.lname,
      email: user.username,
    };

    return res.status(200).json(safeUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}