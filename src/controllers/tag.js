import tagBlog from "../models/tag"
import blogSchema from "../models/blog"

export const create = async (req, res) => {
    try {
        const { name } = req.body
        const exitsNameTag = await tagBlog.findOne({ name: name }).exec()
        
        if (exitsNameTag) {
            return res.status(400).json({ message: "Tag này đã tồn tại tên này rồi" })
        }
        const tag = await new tagBlog(req.body).save()
        res.json(tag)
    } catch (error) {
        res.status(400).json({ message: "Không thêm được Tag" })
    }
}


export const remove = async (req, res) => {
    try {
        const tag = await tagBlog.findOneAndDelete({ slug: req.params.slug }).exec()
        res.json(tag)
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được Tag để xóa" }
        )
    }
}

export const list = async (req, res) => {
    try {
        const limit = req.query.limit * 1 || 100;
        const tag = await tagBlog.find({}).limit(limit).sort({ createdAt: -1 }).exec()
        res.json(tag)
    } catch (error) {
        res.status(400).json({ message: "Không lấy được danh sách Tag" })
    }
}

export const read = async (req, res) => {
    try {
        const limit = req.query.limit * 1 || 100;
        const tag = await tagBlog.findOne({ slug: req.params.slug }).exec()
        const blog = await blogSchema.find({ tagBlog: tag._id }).populate("categoryBlog").populate("tagBlog").limit(limit).sort({ createdAt: -1 }).exec()
        res.json({
            tag,
            blog
        })
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được Tag cùng loại" }
        )
    }
}

export const update = async (req, res) => {
    const condition = { slug: req.params.slug }
    const update = req.body
    const { name } = req.body
    try {
        const tag = await tagBlog.findOneAndUpdate(condition, update).exec()
        res.json(tag)
    } catch (error) {
        res.status(400).json(
            { message: "Không update được Tag" }
        )
    }
}