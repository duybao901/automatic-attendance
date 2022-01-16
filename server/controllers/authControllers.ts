import {Request, Response} from "express";
import Users from "../models/userModel";
import brycpt from "bcrypt";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../config/generateToken";
import {UserLogin, UserRegister} from "../config/interface";

// Controller
class AuthController {
    async register(req: Request, res: Response) {
        try {
            const {name, account, password}: UserRegister = req.body;

            const user = await Users.findOne({account});

            if (user)
                return res.status(400).json({msg: "Account is already exits."});

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
            return res.status(500).json({msg: error.message});
        }
    }
    async login(req: Request, res: Response) {
        try {
            const {account, password}: UserLogin = req.body;

            const user = await Users.findOne({account});

            if (!user)
                return res.status(400).json({msg: "Account is not exits."});

            const isMatch = await brycpt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({msg: "Password is incorrect."});

            const access_token = generateAccessToken({id: user._id});
            const refresh_token = generateRefreshToken({id: user._id});

            //  SET COOKIE
            res.cookie("refreshToken", refresh_token, {
                path: "/api/refresh_token",
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });

            return res.json({
                msg: "Login success",
                data: user,
                access_token,
            });
        } catch (error: any) {
            return res.status(500).json({msg: error.message});
        }
    }
    async refreshToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken;
            return res.json({refreshToken});
        } catch (error: any) {
            return res.status(500).json({msg: error.message});
        }
    }
}

export default new AuthController();
