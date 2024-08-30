import express from "express";
import multer from "multer";
import aws from "aws-sdk";
import multerS3 from "multer-s3";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post('/upload', function (req, res) {
  if (req.query.pass !== 'test') {
    return res.send("Access Denied");
  }
  
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error uploading file.");
    }
    res.send(`https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.originalname}`);
  });
});

app.listen(process.env.PORT || 6000, function () {
  console.log("Server running on port 6000");
});
