import users from "./user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
const userArr = users;

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPWD = await bcrypt.hash(password, 10);

  const profile = {
    username: username,
    password: hashedPWD,
  };

  userArr.push(profile);
  res.json(`Added user:  ${profile}`);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const findUser = userArr.find((u) => u.username === username);
  if (!findUser) {
    return res.status(401).json({ msg: "User not found" });
  }
  //const checkPWD = await bcrypt.compare(password, findUser.password); USE AFTER IMPLEMENTING REGISTER AND DB

  const checkPWD = password === findUser.password;

  if (!checkPWD) {
    return res.status(401).json({ msg: "Wrong password" });
  }
  const token = jwt.sign(
    { username: findUser.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "3d",
    },
  );

  res.json({ token });
};
