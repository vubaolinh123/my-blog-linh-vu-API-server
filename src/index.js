import express from "express"
import cors from 'cors';
import morgan from "morgan"
import mongoose from "mongoose"
import authRouter from "./routers/auth"
import blogRouter from "./routers/blog"
import categoryBlogRouter from "./routers/categoryBlog"
import tagRouter from "./routers/tag"
import colorRouter from "./routers/color"
import commentRouter from "./routers/comment"
import socialRouter from "./routers/social"
// https://blogsminecraft.com

const app = express();

app.use(cors({
    origin: 'https://linkcualinh.com',
    methods: ['POST', 'PUT', 'DELETE','GET']
}));


app.use(morgan("tiny"))
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb'}));

// Router
app.use("/api", authRouter);
app.use("/api", blogRouter);
app.use("/api", categoryBlogRouter);
app.use("/api", tagRouter);
app.use("/api", colorRouter);
app.use("/api", commentRouter);
app.use("/api", socialRouter);


// connect db
// mongoose.connect("mongodb://localhost:27017/minecraftBlog")
//     .then(() => {
//         console.log("Kết nối DB thành công");
//     })
//     .catch(err => console.log(err))
// mongoexport --uri mongodb+srv://vubaolinh123@atlas-cluster-url.mongodb.net/test --collection colors --out ./
const mongoAtlasUri = "mongodb+srv://vubaolinh123:lienminh123@databasebloglv.sbvymx6.mongodb.net/?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose đã được kết nối")
    );
} catch (e) {
    console.log("Không thể kết nối"); 
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Kết nối thất bại ${err}`));
dbConnection.once("open", () => console.log("Kết nối thành công đến DB!"));

const PORT = 8080;
app.listen(PORT, () => {
    console.log("Server của bạn đang chạy ở cổng ", PORT);
})