import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.password;
const MONGO_URL = `mongodb+srv://admin:${password}@cluster0.qui8bja.mongodb.net/`;
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
    startDate: {
      type: Date,
    },
    thumbnail: {
      type: String,
      unique: true, //유일한 값이어야 함
    },
    story: {
      type: String,
    },

    tags: {
      type: [String],
    },
  },
  {
    timestamps: true, //내가 insert 하는 시점에 맞춰서 추가가 된다
  }
);

//역참조 만들기(무비 페이지 안에 리뷰를 보이게)
MovieSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "movie",
});

const Movie = mongoose.model("Movie", MovieSchema);

// Movie.create({
//   title: "야옹",
//   director: {
//     first: "냐",
//     last: "옹이",
//   },
//   startDate: "2024-02-01",
//   thumbnail:
//     "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAxMTNfMTIx%2FMDAxNzA1MTQ2MjE5ODIy.vnoAPMHodL1ai1jPZeRN9CiXW5CERenerEd_paOdnIMg.1fk1dn6GcpBLX2djCqlhcbgSaG_w55B1iiPlBVyj5tAg.PNG.hahanegoodclean%2F2660c007-e02a-4dd2-bf84-2544546ab135.png&type=sc960_832",
//   story: "태초에 야옹이가 있었다",
//   tags: [2024, "액션"],
// }).then((data) => {
//   console.log(data);
// });

const ReviewSchema = new mongoose.Schema({
  writer: {
    type: String,
    required: true,
  },
  movie: {
    //Movie를 참조
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Movie",
  },
  title: {
    type: String,
    required: true,
    validate: function (val) {
      return val.trim() !== "" && val.length > 1;
    },
  },
  content: {
    type: String,
    default: "",
  },
});

const Review = mongoose.model("Review", ReviewSchema);

// Review.create({
//   writer: "멍멍이",
//   movie: "65bb368f67e86aacdb9c5fbc", // movie의 ObjectId 값을 넣어준거임
//   title: "야옹이를 보고..",
//   content: "최고 재밌다",
// }).then((data) => {
//   console.log(data);
// });

// Movie.findOne({ title: "야옹" }).then((data) => {
//   Review.create({
//     writer: "멍멍이",
//     movie: data._id,
//     title: "야옹이를 보고..2",
//   }).then((data) => {
//     console.log(data);
//   });
// });

//리뷰 페이지 안에 영화 모여있게
// Review.find({})
//   .populate("movie")
//   .then((review) => {
//     console.log(review);
//   });
//역참조
//영화 페이지안에 리뷰 모여있게
Movie.find({})
  .populate("reviews")
  .then((movie) => {
    console.log(movie[0].reviews);
  });
