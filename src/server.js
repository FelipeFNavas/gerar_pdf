import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import pdf from "html-pdf";

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

app.get("/", (req, res) => {
  ejs.renderFile(
    path.join(__dirname, "print.ejs"),
    { passengers },
    (err, html) => {
      if (err) {
        return res.send(err);
      }

      const options = {
        height: "11.25in",
        width: "8.5in",
        header: {
          height: "20mm",
        },
        footer: {
          height: "20mm",
        },
      };

      // criar pdf
      pdf.create(html, options).toFile("report.pdf", (err, data) => {
        if (err) {
          return res.send(err);
        }

        // enviar para o navegador
        return res.send("PDF criado com sucesso!");
      });
    }
  );
});

app.listen(3000);
