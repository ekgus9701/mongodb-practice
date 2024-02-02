import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.password;
console.log(password);
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

const Cat = mongoose.model("Cat", {
  name: String,
});

//create하는 방법 1
// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then((data) => {
//   console.log("저장된 데이터");
//   console.log(data);
// });

//create하는 방법 2
// Cat.create({ name: "야옹이" }).then((data) => {
//   console.log(data);
// });

// Cat.insertMany([{ name: "고양이1" }, { name: "고양이2" }]).then((data) => {
//   console.log(data);
// });

// Cat.find({
//   name: "야옹이",
// }).then((data) => {
//   console.log(data);
// });

// Cat.findById("65bb2109f47231d1d3e228e8").then((data) => {
//   console.log(data);
// });

// Cat.findOne({ name: "야옹이" }).then((data) => {
//   console.log(data);
// });

//고양이2 하나만 삭제
// Cat.find({}).then((data) => {
//   console.log(data);
//   console.log("--".repeat(10));
//   Cat.deleteOne({ name: "고양이2" }).then((data) => {
//     console.log(data);
//   });
// });

//야옹이 다 삭제
// Cat.find({}).then((data) => {
//   console.log(data);
//   console.log("--".repeat(10));

//   Cat.deleteMany({ name: "야옹이" }).then((data) => {
//     console.log(data);
//   });
// });

//Cat.insertMany([{ name: "부엉이" }, { name: "야옹이" }, { name: "야옹이" }]);

// Cat.updateOne(
//   { name: "야옹이" },
//   {
//     name: "나비",
//   }
// ).then((data) => {
//   console.log(data);
// });

// Cat.updateMany(
//   { name: "Zildjian" },
//   {
//     name: "meow",
//   }
// ).then((data) => {
//   console.log(data);
// });
