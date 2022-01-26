import { Request, Response } from "express";
import { RequestUser } from "../config/interface";
import Users from "../models/userModel"
class UserController {

    async confirmAccount(req: RequestUser, res: Response) {
        try {
            const { id } = req.params;

            const user = await Users.findById(id);
            if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại." })

            await Users.findByIdAndUpdate(user._id, {
                confirm: true
            })

            return res.json({ msg: "Cập nhập thành công." });

        } catch (error: any) {
            return res.status(500).json({ msg: error.message });
        }
    }
    
}

export default new UserController;