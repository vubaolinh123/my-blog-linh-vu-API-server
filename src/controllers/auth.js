import User from "../models/user"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

    const { email, name, password } = req.body;
    try {
        const exitsUser = await User.findOne({ email }).exec();

        if (exitsUser) {
            return res.status(400).json({ message: "Tài khoản đã tồn tại" })
        }

        const user = await new User({ email, name, password }).save();

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(
            { message: "Không đăng ký được tài khoản" }
        )
    }
}

export const login = async (req, res, next) => {
    const { name, password } = req.body
    try {
        const user = await User.findOne({ name }).exec()
        if (!user) {
            return res.status(400).json({ message: "Tài khoản không tồn tại" })
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({ message: "Mật khẩu không đúng" })
        }
        if (user.status === 1) {
            return res.status(400).json({ message: "Tài khoản của bạn bị khóa" })
        }

        const token = jwt.sign({ _id: user.id }, "abc")

        return res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                status: user.status
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Đăng nhập thất bại" })
    }
}
