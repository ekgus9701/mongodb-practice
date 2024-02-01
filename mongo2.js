import mongoose from "mongoose";
const MONGO_URL =
  "mongodb+srv://admin:QRWaLPEBNOHPUC7Z@cluster0.qui8bja.mongodb.net/";
mongoose
  .connect(MONGO_URL, {
    retryWrites: true,
    w: "majority",
  })
  .then((resp) => {
    console.log(resp);
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

const ReviewSchema = new mongoose.Schema({
  writer: String,
  title: String,
});

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, //꼭 있어야 함
    },
    director: {
      first: String,
      last: String,
    },

    tags: [String],

    reviews: [ReviewSchema],
  },
  {
    timestamps: true, //내가 insert 하는 시점에 맞춰서 추가가 된다
  }
);
