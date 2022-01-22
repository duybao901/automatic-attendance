import { Request, Response } from "express";
import Users from "../models/userModel";
import brycpt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../config/generateToken";
import { UserLogin, UserRegister, DecodeToken } from "../config/interface";

// Controller
class AuthController {
    // Register
    async register(req: Request, res: Response) {
        try {
            const { name, account, password }: UserRegister = req.body;

            const user = await Users.findOne({ account });

            if (user)
                return res.status(400).json({ msg: "Account is already exits." });

            const passwordHasd = await brycpt.hash(password, 12);

            const newUser = new Users({
                name,
                account,
                password: passwordHasd,
            });

            await newUser.save();
            return res.json({
                msg: "Register success! Please, Wait admin confirm.",
            });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Login
    async login(req: Request, res: Response) {
        try {
            const { account, password }: UserLogin = req.body;

            const user = await Users.findOne({ account });

            // Find user
            if (!user)
                return res.status(400).json({ msg: "Account is not exits." });

            // Compare password
            const isMatch = await brycpt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({ msg: "Password is incorrect." });

            // Check account is confirm
            if (!user.confirm) {
                return res.status(400).json({ msg: "Account not approved." })
            }

            const access_token = generateAccessToken({ id: user._id });
            const refresh_token = generateRefreshToken({ id: user._id });

            //  SET COOKIE
            res.cookie("refreshToken", refresh_token, {
                path: "/api/refresh_token",
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            return res.json({
                msg: "Login success",
                user,
                access_token,
            });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }

    // Refresh Token -> {User, Access Token}
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.status(400).json({ msg: "Please login now." });

            const decode = await <DecodeToken>jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);

            if (!decode) return res.status(400).json({ msg: "Please login now." });


            const user = await Users.findById(decode.id);
            if (!user) return res.status(400).json({ msg: "This account is not exist." })

            const access_token = generateAccessToken({ id: user._id });
            return res.json({
                user,
                access_token
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
}

export default new AuthController();
