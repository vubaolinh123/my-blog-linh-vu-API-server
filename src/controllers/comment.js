import Comment from "../models/comment"


export const create = async (req, res) => {
    try {
        const comment = await new Comment(req.body).save();
        res.json(comment)
    } catch (error) {
        console.log(error);
        res.status(400).json(
            { message: "Không thêm bình luận được" }
        )
    }
}
export const list = async (req, res) => {
    try {
        const status = req.query.status;
        if(status){
            const comment = await Comment.find({ status: status }).populate('Blog').sort({ "createdAt": -1 })
            res.json(comment)
        }else{
            const comment = await Comment.find().populate('Blog').sort({ "createdAt": -1 })
            res.json(comment)
        }
    } catch (error) {
        res.status(400).json(
            { message: "Không lấy được danh sách comment" }
        )
    }
}


export const getOne = async (req, res) => {
    try {
        const comment = await Comment.findOne({ _id: req.params.id }).populate('Blog')
        res.json(comment)
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được 1 bình luận" }
        )
    }
}

export const update = async (req, res) => {
    const condition = { _id: req.params.id }
    const update = req.body
    try {
        const comment = await Comment.findOneAndUpdate(condition, update).exec()
        res.json(comment)
    } catch (error) {
        res.status(400).json(
            { message: "Không cập nhật được bình luận" }
        )
    }
}

export const remove = async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.id }).exec()
        res.json(comment)
    } catch (error) {
        res.status(400).json(
            { message: "Không tìm được bình luận để xóa" }
        )
    }
}

