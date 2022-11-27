import User from "../models/user"

export const userById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id).exec();
        if (!user) {
            res.status(400).json({ message: "Không tìm thấy User" })
        }
        req.profile = user;
        req.profile.password = undefined
        next()
    } catch (error) {
        res.status(400).json(
            { error: "Có lỗi nào đấy đang xẩy ra userById" }
        )
    }
}

export const read = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).exec()
        res.json({
            user,
        })
    } catch (error) {
        res.status(400).json(
            { error: "Không tim được User cùng loại" }
        )
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body
    try {
        const user = await User.findOneAndUpdate(condition, update).exec()
        res.json(user)
    } catch (error) {
        res.status(400).json(
            { error: "Không update được user" }
        )
    }
}

export const list = async (req, res) => {
    try {
        const user = await User.find().sort({ "createdAt": -1 })
        res.json(user)
    } catch (error) {
        res.status(400).json(
            { error: "Không lấy được danh sách user" }
        )
    }
}

export const remove = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id }).exec()
        res.json(user)
    } catch (error) {
        res.status(400).json(
            { error: "Không tìm được user để xóa" }
        )
    }
}