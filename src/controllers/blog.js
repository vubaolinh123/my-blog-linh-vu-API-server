import Blogs from "../models/blog";
import Comments from "../models/comment";

export const create = async (req, res) => {
  try {
    const { title } = req.body;
    const exitsNameBlog = await Blogs.findOne({ title }).exec();

    if (exitsNameBlog) {
      return res
        .status(400)
        .json({ message: "Bài viết này đã tồn tại tên này rồi" });
    }

    const blog = await new Blogs(req.body).save();
    res.json(blog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Không thêm được blog" });
  }
};
export const list = async (req, res) => {
  try {
    const limit = req.query.limit * 1 || 12;
    const searchField = req.query.q;
    if (searchField !== undefined) {
      const blogSearch = await Blogs.find({
        title: { $regex: searchField, $options: "$i" },
      })
        .populate("categoryBlog")
        .populate("tagBlog")
        .sort({ createdAt: -1 });

      return res.json(blogSearch);
    }
    const blog = await Blogs.find()
      .populate("categoryBlog")
      .populate("tagBlog").limit(limit)
      .sort({ createdAt: -1 });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Không tìm được blog" });
  }
};

export const getOne = async (req, res) => {
  try {
    const blog = await Blogs.findOne({ slug: req.params.slug })
      .populate("categoryBlog")
      .populate("tagBlog");
    const comment = await Comments.find({ Blog: blog._id })
      .select("-Blog")
      .exec();
    res.json({
      blog,
      comment,
    });
  } catch (error) {
    res.status(400).json({ message: "Không tìm được Blog nào với Id như vậy" });
  }
};

export const related = async (req, res) => {
  try {
    const slug = req.params.slug;
    // const blog = await Blogs.findOne({ slug: req.params.slug }).populate('categoryBlog').populate('tagBlog').sort({ "createdAt": -1 })
    const blog = await Blogs.findOne({ slug: slug });
    const getAllBlogFromCate = blog.categoryBlog.map((item) =>
      Blogs.find({ categoryBlog: item.toString() })
        .select("-categoryBlog")
        .exec()
    );
    // noi mang
    const [result, result2] = await Promise.all(getAllBlogFromCate);
    const arrFinally = [...result, ...result2];
    // remove duplicate object in array
    let result1a = {};
    arrFinally.forEach((item) => {
      result1a = { ...result1a, [item._id]: item };
    });
    let result2a = [];
    for (const key in result1a) {
      result2a.push(result1a[key]);
    }
    const related = result2a.sort().filter((item) => item.slug !== slug);
    res.json(related);
  } catch (error) {
    res.status(400).json({ message: "Không tìm được Blog nào với Id như vậy" });
  }
};

export const update = async (req, res) => {
  // khi update nếu có ?tag= hoặc cate= thì sẽ xóa Cate hoặc Tag đó
  const idTag = req.query.tag;
  const idCate = req.query.cate;
  const condition = { slug: req.params.slug };
  const update = req.body;
  const { title } = req.body;

  if (idTag !== undefined) {
    try {
      const listBlog = await Blogs.findOne({
        slug: req.params.slug,
        tagBlog: idTag,
      });
      const dataIdTagSurvival = listBlog.tagBlog.filter(
        (blog) => blog.toString() !== idTag
      );

      const blog = await Blogs.findOneAndUpdate(
        { slug: req.params.slug, tagBlog: idTag },
        { tagBlog: dataIdTagSurvival }
      ).exec();
      return res.json(blog);
    } catch (error) {
      res.status(400).json({ message: "Không xóa được Tag ở Blog" });
    }
  }
  if (idCate !== undefined) {
    try {
      // Tìm Blog theo Id và Id Cate
      const listBlog = await Blogs.findOne({
        slug: req.params.slug,
        categoryBlog: idCate,
      });
      // Lọc và xóa Id muốn xóa
      const dataIdCateSurvival = listBlog.tagBlog.filter(
        (blog) => blog.toString() !== idCate
      );
      // Cập nhật lại Blog
      const blog = await Blogs.findOneAndUpdate(
        { slug: req.params.slug, categoryBlog: idCate },
        { categoryBlog: dataIdCateSurvival }
      ).exec();

      return res.json(blog);
    } catch (error) {
      res.status(400).json({ message: "Không xóa được Danh mục ở Blog" });
    }
  }

  // Nếu không xóa danh mục hoặc Tag của bài viết thì sẽ chạy vào phần Update Blog
  try {
    const blog = await Blogs.findOneAndUpdate(condition, update).exec();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Không cập nhật được blog" });
  }
};

export const remove = async (req, res) => {
  try {
    const blog = await Blogs.findOneAndDelete({ slug: req.params.slug }).exec();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Không tìm được blog để xóa" });
  }
};

export const page = async (req, res) => {
  try {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 12;
    const skip = limit * (page - 1);
    const sort = req.query.sort || { createdAt: -1 };
    const blog = await Blogs.find().limit(limit).skip(skip).sort(sort);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: "Không tìm được blog" });
  }
};
