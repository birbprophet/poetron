import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4001;
app.use(bodyParser.json());

app.post("/scrape", (req: any, res: any) => {
  res.send("app works");
});

app.listen(port, () => console.log(`App ready and listening on port ${port}`));
