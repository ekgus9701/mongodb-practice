import axios from "axios";
import fs from "fs";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
const password = process.env.password;

//MongoDB 스키마에 넣기

const MONGO_URL = `mongodb+srv://admin:${password}@cluster0.qui8bja.mongodb.net/`;
mongoose
  .connect(MONGO_URL, {
    retryWrites: true,
    w: "majority",
  })
  .then((resp) => {
    //console.log(resp);
    //console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

const ReviewSchema = new mongoose.Schema({
  writer: String,
  voting: Number,
  Rate: Number,
});

const WatchaSchema = new mongoose.Schema({
  title: String,
  reviews: [ReviewSchema],
});

const Watcha = mongoose.model("Watcha", WatchaSchema);

async function fetchPage() {
  const url =
    "https://pedia.watcha.com/api/staffmades/278/contents?page=1&size=50";
  try {
    const response = await axios.get(
      url,

      {
        headers: {
          authority: "pedia.watcha.com",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          "Content-Type": "application/json",
          "X-Frograms-App-Code": "Galaxy",
          "X-Frograms-Client": "Galaxy-Web-App",
          "X-Frograms-Version": "2.1.0",
          "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
          "X-Frograms-Galaxy-Region": "KR",
          "X-Frograms-Version": "2.1.0",
          "X-Watcha-Client-Language": "ko",
          "X-Watcha-Client-Region": "KR",
          "X-Watcha-Remote-Addr": "1.231.165.73",
          "X-Frograms-Galaxy-Language": "ko",
        },
      }
    );
    const data = response.data;
    const list = data["result"]["result"];
    fs.writeFileSync("./watcha_crawl.json", JSON.stringify(list));

    // console.log(list);
  } catch (err) {
    console.error(err);
  }
}

fetchPage();
