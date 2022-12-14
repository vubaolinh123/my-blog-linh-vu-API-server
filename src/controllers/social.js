import social from "../models/social"

export const create = async (req, res) => {
    try {
        const { name } = req.body
        const exitsName = await social.findOne({ name: name }).exec()
        
        if (exitsName) {
            return res.status(400).json({ message: "Social này đã tồn tại tên này rồi" })
        }

        const Social = await new social(req.body).save()
        res.json(Social)
    } catch (error) {
        res.status(400).json({ message: "Không thêm được Social" })
    }
}


export const remove = async (req, res) => {
    try {
        const Social = await social.findOneAndDelete({ _id: req.params.id }).exec()
        res.json(Social)
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được Social để xóa" }
        )
    }
}

export const list = async (req, res) => {
    try {
        const Social = await social.find({}).sort({ createdAt: -1 }).exec()
        res.json(Social)
    } catch (error) {
        res.status(400).json({ message: "Không lấy được danh sách Social" })
    }
}

export const read = async (req, res) => {
    try {
        const Social = await social.findOne({ _id: req.params.id }).exec()
        res.json({
            Social
        })
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được Social" }
        )
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body
    
    try {
        const Social = await social.findOneAndUpdate(condition, update).exec()
        res.json(Social)
    } catch (error) {
        res.status(400).json(
            { message: "Không update được Social" }
        )
    }
}