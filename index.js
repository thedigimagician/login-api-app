import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.post("/collect", async (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
  console.log(`Client IP: ${clientIp}`);
  console.log(req.protocol, req.hostname);
  console.log(req.body);
  appendOrCreateFile("data.txt", JSON.stringify(req.body));
  res.json({ response: "success" });
});

function appendOrCreateFile(filename, dataToAppend) {
  if (fs.existsSync(filename)) {
    // File exists, append the data to a new line
    fs.appendFile(filename, dataToAppend + "\n", (err) => {
      if (err) throw err;
      console.log(`Data appended to ${filename}`);
    });
  } else {
    // File doesn't exist, create the file and append the data
    fs.writeFile(filename, dataToAppend + "\n", (err) => {
      if (err) throw err;
      console.log(`File ${filename} created with initial data`);
    });
  }
}
