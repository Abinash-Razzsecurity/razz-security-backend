const express = require("express");
const PDFDocument = require("pdfkit");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post("/generate-pdf", (req, res) => {
  const { email, asset, complexity, compliance, stage } = req.body;

  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=Razz_Security_Roadmap.pdf");

  doc.pipe(res);

  doc.fontSize(22).text("Razz Security – Security Roadmap");
  doc.moveDown();
  doc.text(`Email: ${email}`);
  doc.text(`Asset: ${asset}`);
  doc.text(`Complexity: ${complexity}`);
  doc.text(`Compliance: ${compliance}`);
  doc.text(`Stage: ${stage}`);

  doc.moveDown();
  doc.text("Next Steps:");
  doc.list([
    "Comprehensive VAPT",
    "Architecture Review",
    "Compliance Readiness",
    "Continuous Monitoring"
  ]);

  doc.end();
});

app.listen(3000);
