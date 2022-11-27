import categoryBlog from "../models/categoryBlog"
import blogModel from "../models/blog"

export const create = async (req, res) => {
    try {
        const { name } = req.body
        const exitsNameBlog = await categoryBlog.findOne({ name: name }).exec()
        
        if (exitsNameBlog) {
            return res.status(400).json({ message: "Danh mục này đã tồn tại tên này rồi" })
        }

        const cateBlog = await new categoryBlog(req.body).save()
        res.json(cateBlog)
    } catch (error) {
        res.status(400).json({ message: "Không thêm được danh mục Blog" })
    }
}


export const remove = async (req, res) => {
    try {
        const cateBlog = await categoryBlog.findOneAndDelete({ slug: req.params.slug }).exec()
        res.json(cateBlog)
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được danh mục để xóa" }
        )
    }
}

export const list = async (req, res) => {
    try {
        const cateBlog = await categoryBlog.find({}).sort({ createdAt: -1 }).exec()
        res.json(cateBlog)
    } catch (error) {
        res.status(400).json({ message: "Không lấy được danh sách Danh Mục Blog" })
    }
}

export const read = async (req, res) => {
    try {
        const limit = req.query.limit * 1 || 100;
        const cateBlog = await categoryBlog.findOne({ slug: req.params.slug }).exec()
        const blog = await blogModel.find({ categoryBlog: cateBlog._id }).populate("categoryBlog").populate("tagBlog").limit(limit).sort({ createdAt: -1 }).exec()
        res.json({
            cateBlog,
            blog
        })
    } catch (error) {
        console.log(error)
        res.status(400).json(
            { message: "Không tìm được danh mục Blog cùng loại" }
        )
    }
}

export const update = async (req, res) => {
    const condition = { slug: req.params.slug }
    const update = req.body
    const { name } = req.body
    try {
        const category = await categoryBlog.findOneAndUpdate(condition, update).exec()
        res.json(category)
    } catch (error) {
        res.status(400).json(
            { message: "Không update được danh mục Blog" }
        )
    }
}