import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";

//MongoDB 스키마에 넣기
const MONGO_URL =
  "mongodb+srv://admin:QRWaLPEBNOHPUC7Z@cluster0.qui8bja.mongodb.net/movie";
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
    "https://pedia.watcha.com/api/staffmades/278/contents?page=3&size=50";
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
        },
      }
    );
    const data = response.data;
    console.log(data);

    const $ = cheerio.load(data);

    /*const everything = await Promise.all(
      $(".css-0")
        .map(async (i, el) => {
          const title = $(el).find(".css-1ofozqs a").prop("title");
          const links = $(el).find(".css-1ofozqs a").prop("href");
          // const tags = tagLists;

          //   async function fetchPage2() {
          //     const urls = url + links;
          //     try {
          //       const response = await axios.get(urls);
          //       const data = response.data;
          //       const $ = cheerio.load(data);
          //       const authorDetails = $(".author-details").text();
          //       return authorDetails;
          //     } catch (err) {
          //       console.error(err);
          //     }
          //   }

          //   const authorDetails = await fetchPage2();

          return {
            title,
            links,
          };
        })
        .get()
    );*/

    // console.log(everything);
  } catch (err) {
    console.error(err);
  }
}

fetchPage();
