import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import fs from "node:fs";
import morgan from "morgan";
import cors from "cors";

    var app = express();
    app.set("view engine", "ejs")
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors())
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, './uploads');
      },
      filename: function (req, file, callback) {
        var klasor = fs.readdirSync("./uploads");
        console.log(file.originalname);    
        //if()
        callback(null, file.originalname);
      }
    });
    app.use(morgan('dev'));

    const password = 'test';
    var upload = multer({ storage : storage}).single('file');
    app.get("/i/:id", (req, res) => {
        var id = req.params.id;
        if(!fs.existsSync(__dirname+`/uploads/${id}`)) return res.status(404).json({statusCode:404, message: 'File not found'});
        return res.status(200).sendFile(__dirname+`/uploads/${id}`);
        
    })
    // app.get("/",express.static(__dirname+"/uploads"))
    app.post('/upload',function(req,res){
      console.log(req.query.pass , password)

      if(req.query.pass !== password){
        return res.send("Access Denied")
      }
        upload(req,res,function(err) {
            if(err) {
                console.log(err)
                return res.end("Error uploading file.");
            }
            console.log("file uploaded");
            res.send('http://cdn.ibrahimhalilsezgin.fun/i/' + req.file.originalname);            
        });
    });

    app.listen(80,function(){
        console.log("Working on port 3000");
    });
