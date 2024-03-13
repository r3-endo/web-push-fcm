import * as express from "express";
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import { firebaseConfig } from "./const/firebaseConfig";
import "dotenv/config";
import rateLimit from "express-rate-limit";
import { ErrorRequestHandler } from "express";

const app = express();
const router = express.Router();
const port = process.env.PORT;

app.use(router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

// 流量制限
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1分間
  max: 100, // 最大リクエスト数
  message: "Too many requests from this IP, please try again later.",
});

router.post(
  "/api/send-firebase-message",
  limiter,
  bodyParser.json(),
  async (req, res) => {
    try {
      const registrationToken = req.body.token;
      if (!registrationToken) {
        return res.status(400).json({ error: "Token is required" });
      }
      const message = {
        notification: {
          title: "test",
          body: "From Node.js",
        },
        token: registrationToken,
      };
      const response = await admin.messaging().send(message);
      res.status(200).json({ success: true, message: "Success!" });
      console.log(response);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error!!");
    }
  }
);

// エラーハンドリング
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
};
app.use(errorHandler);

app.listen(port, () => {
  // debug用
  // console.log(`Listening on port ${port}`);
});
