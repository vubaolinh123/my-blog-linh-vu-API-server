import Color from "../models/color";

export const list = async (req, res) => {
  try {
    const colors = await Color.find({}).exec();
    res.json(colors);
  } catch (error) {
    res.status(400).json({ message: "Không lấy được danh sách màu" });
  }
};
export const read = async (req, res) => {
  try {
    const color = await Color.findOne({ _id: req.params.id }).exec();
    res.json(color);
  } catch (error) {
    res.status(400).json({ error: "Không tìm được color cùng loại" });
  }
};
export const update = async (req, res) => {
  const condition = { _id: req.params.id };
  const update = req.body;
  try {
    const color = await Color.findOneAndUpdate(condition, update).exec();
    res.json(color);
  } catch (error) {
    res.status(400).json({ message: "Không update được color" });
  }
};
