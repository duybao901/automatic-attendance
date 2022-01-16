import {Request, Response} from "express";
class UserController {
    async confrimAccount(req: Request, res: Response) {
        try {
        } catch (error: any) {
            return res.status(500).json({msg: error.message});
        }
    }
}

export default new UserController;