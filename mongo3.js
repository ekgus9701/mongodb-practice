import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.password;
const MONGO_URL = "mongodb+srv://admin:password@cluster0.qui8bja.mongodb.net/";
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

const personSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  age: Number,
});
const Person = mongoose.model("Person", personSchema);

// Person.insertMany([
//   {
//     name: {
//       first: "연아",
//       last: "김",
//     },
//     age: 23,
//   },
//   {
//     name: {
//       first: "지현",
//       last: "남",
//     },
//     age: 20,
//   },
// ]).then((result) => {
//   console.log(result);
// });

Person.find({
  age: { $gt: 20 },
})
  .limit(1)
  .select({
    age: true,
  })
  .then((people) => {
    console.log(people);
  });
