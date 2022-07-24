import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const app = express();

const passengers = [
  {
    name: "Joyce",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Brock",
    flightNumber: 7859,
    time: "18h00",
  },
  {
    name: "Eve",
    flightNumber: 7859,
    time: "18h00",
  },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: "networkidle2",
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: "letter",
    margin: {
      top: "1cm",
      right: "1cm",
      bottom: "1cm",
      left: "1cm",
    },
  });

  await browser.close();

  res.contentType("application/pdf");

  return res.send(pdf);
});

app.get("/", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "print.ejs"),
    { passengers },
    (err, html) => {
      if (err) {
        return res.send(err);
      }

      // enviar para o navegador
      return res.send(html);
    }
  );
});

app.listen(3000);
