//EphDV22CWZwDRgSJ
import express from "express";
import mongoose from "mongoose";
import Cards from "./CardModel.js"; //this should have .js
import Cors from "cors";
//app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://red9tx:EphDV22CWZwDRgSJ@cluster0.cnrz0t0.mongodb.net/tinderdb?retryWrites=true&w=majority&appName=Cluster0";
//middleware
//this is required to send or receive the data in json
app.use(express.json());
app.use(Cors());
//db config
mongoose.connect(connection_url);
//api endpoints
app.get("/", (req, res) => res.status(200).send("hello welcome"));

//=>to upload
//oldone
// app.post("/tinder/card", (req, res) => {
//   const card = req.body;
//   Cards.create(card, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

//newone
app.post("/tinder/card", async (req, res) => {
  try {
    const card = req.body;
    const newCard = await Cards.create(card);
    res.status(201).send(newCard);
  } catch (err) {
    res.status(500).send(err);
  }
});

//=>to get the data
//oldone
// app.get("/tinder/card", (req, res) => {
//   Cards.find((err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });
//newone
app.get("/tinder/card", async (req, res) => {
  try {
    const data = await Cards.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
//listener
app.listen(port, () => console.log(`listerning on ${port}`));
