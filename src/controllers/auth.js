import { loginUser, registerUser } from "../schema/user.js";
import prisma from "../lib/prisma.js";
import { compareSync, hashSync } from "bcrypt";
import { generateTokens } from "../utils/token.js";

export const signUp = async (req, res) => {
  const { error, value } = registerUser.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await prisma.user.findFirst({
    where: { email: value.email },
  });

  if (user) return res.status(400).json({ error: "User already exists!" });

  user = await prisma.user.create({
    data: {
      username: value.username,
      email: value.email,
      password: hashSync(value.password, 10),
    },
  });
  res.json("User successfully created.");
};

export const login = async (req, res) => {
  const { error, value } = loginUser.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  let user = await prisma.user.findFirst({ where: { email: value.email } });

  if (!user) return res.status(400).json({ error: "Invalid credentials!" });

  const isPasswordValid = compareSync(value.password, user.password);

  if (!isPasswordValid)
    return res.status(400).json({ error: "Invalid credentials!" });

  const { accessToken } = generateTokens(user);

  return res.status(200).json({
    id: user.id,
    name: user.username,
    accessToken
  });
};
