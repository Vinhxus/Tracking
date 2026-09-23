import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export async function signup(req,res){
    try{
        const {mail, name, password} = req.body;
        if (!mail){
            return res.status(400).json({message:"require mail!"})
        }
        if (!name){
            return res.status(400).json({message:"require name!"})
        }
        if (!password){
            return res.status(400).json({message:"require password!"})
        }

        const normalizedMail = mail.trim().toLowerCase();
        const existingUser = await User.findOne({ mail: normalizedMail });

        if (existingUser){
            return res.status(400).json({message:"this mail's already exist!"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({mail: normalizedMail, name, password : hashedPassword});

        const { password: _, ...safeUser } = user.toObject();; //destrucure
        // = const safeUser = { ...user };
        // delete safeUser.password;
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({ message: "sign up successfully", user: safeUser, token });
                
    } catch (error) {
        console.error("error in signup", error);
        return res.status(500).json({message:"Internal server error!"})
    }
}

export async function login(req,res){
    try{
        const {mail, password} = req.body;
        if (!mail){
            return res.status(400).json({message:"require mail!"})
        }
        if (!password){
            return res.status(400).json({message:"require password!"})
        }

        const normalizedMail = mail.trim().toLowerCase();
        const existUser = await User.findOne({ mail: normalizedMail });

        if (!existUser){
            return res.status(404).json({message:"Invalid email or password!"})
        }

        const correct = await bcrypt.compare(password, existUser.password);
        if (!correct){
            return res.status(400).json({message:"Invalid email or password!"})
        }
        const token = jwt.sign(
            { userId: existUser._id }, // hoặc .id tùy schema
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const { password: _, ...safeUser } = existUser.toObject();
        res.status(200).json({ message: "Log in successfully!", user: safeUser, token });
                
    } catch (error) {
        console.error("error in login", error);
        return res.status(500).json({message:"Internal server error!"})
    }
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export async function getMe(req, res) {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("error in getMe", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}