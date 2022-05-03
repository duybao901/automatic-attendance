import { Request, Response } from 'express'
import { ILabledFaceDescriptor } from '../config/interface'
import fs from 'fs'

export const saveLabledFaceDescriptors = async (req: Request, res: Response) => {
    try {
        const data: ILabledFaceDescriptor = req.body;

        // Luu file json
        const pathFile = `${__dirname}/../descriptors/${data.label}.json`
        fs.writeFileSync(pathFile, JSON.stringify(data))



        return res.json({ msg: "Lưu model thành công" })

    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({ msg: error.message })
    }
}