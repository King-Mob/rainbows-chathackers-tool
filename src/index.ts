import 'dotenv/config';
import express from "express";
import * as fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import handleMessage from "./messages";

const { secret } = process.env;

const port = 5056;

const moduleRegistration = {
  id: "rainbow",
  uuid: uuidv4(),
  url: `http://localhost:${port}`,
  emoji: "🌈",
  wake_word: "rainbow",
  title: "Rainbow App",
  description: "This module sends a new rainbow every day",
  secret,
  event_types: [
    "m.room.message"
  ]
}

function generateRegistrationFile() {
  fs.writeFileSync(`./${moduleRegistration.id}.json`, JSON.stringify(moduleRegistration));
}

async function start() {

  const app = express();
  app.use(express.json());

  app.get("/", async (req, res) => {
    const htmlPath = path.resolve(__dirname, "../../web/dist/index.html")

    res.sendFile(htmlPath);
  })

  app.post("/", async (req, res) => {
    const { event } = req.body;

    let response = {};

    if (event.type === "m.room.message")
      response = await handleMessage(event);

    console.log(response)

    res.send({ success: true, response });
  });

  app.get("/api/state", async (req, res) => {
    const { roomId } = req.query;

    console.log(roomId)

    res.send({ success: true, rainbows: true })
  })

  app.listen(port);
};

generateRegistrationFile();
start();
