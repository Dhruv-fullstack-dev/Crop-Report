const express = require("express");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

const fs = require("fs");
const PDFDocument = require("pdfkit");
const sizeOf = require("image-size");
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
// MySQL connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gupta.dhruv@2695",
  database: "my_database",
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// geta all the documents from the database
app.get("/api/documents", (req, res) => {
  // Execute a SQL SELECT query to retrieve all entries from the documents table
  const sql = "SELECT * FROM documents";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error retrieving documents:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    // Send the retrieved data back as a JSON response
    res.json(results);
  });
});

// Define a route to handle POST requests to /api/upload
// app.post("/api/upload", (req, res) => {
//   // Extract category, date, and image data from the request body
//   const { category, date, image } = req.body;
//   console.log("image:: Data>>>>>", image);
//   // Extract the base64-encoded image data
//   const matches = image.match(/^data:(.+);base64,(.+)$/);
//   if (!matches || matches.length !== 3) {
//     return res.status(400).json({ error: "Invalid image data format" });
//   }
//   const base64Data = matches[2];

//   // Convert base64-encoded image data to a buffer
//   const imageDataBuffer = Buffer.from(base64Data, "base64");

//   // Write the image data to a file
//   const imageFileName = `${uuidv4()}.jpg`; // Assuming JPEG format for simplicity
//   const imagePath = path.join(__dirname, "uploads", imageFileName);
//   fs.writeFile(imagePath, imageDataBuffer, (err) => {
//     if (err) {
//       console.error("Error saving image:", err);
//       return res.status(500).json({ error: "Failed to save image" });
//     }

//     // Image saved successfully, proceed with further processing

//     // Save image URL or path to database
//     const imageUrl = `/uploads/${imageFileName}`;
//     // Add code to save imageUrl to database

//     // Send response with image URL
//     res.json({ imageUrl });
//   });
// });

app.post("/api/upload", (req, res) => {
  // Extract category and date from form data
  console.log(req.body);
  const { image, category, date } = req.body;

  // Convert data URI to image file
  // const imageBuffer = Buffer.from(image.split(",")[1], "base64");
  // const imageFileName = `${uuidv4()}.jpg`;
  const imagePath = path.join(__dirname, "uploads", image.name);

  // fs.writeFileSync(imagePath, imageBuffer);

  const pdfFileName = `${uuidv4()}.pdf`;
  const pdfPath = path.join(__dirname, "uploads", pdfFileName);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));
  doc.image(imagePath, { width: 400 });
  doc.end();

  // Save PDF URL to the database
  const pdfUrl = `/uploads/${pdfFileName}`;
  const sql = "INSERT INTO documents (category, date, pdf) VALUES (?, ?, ?)";
  connection.query(sql, [category, date, pdfUrl], (err, result) => {
    if (err) {
      console.error("Error inserting data into database:", err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    console.log("Data inserted into database successfully");
  });

  // Send the PDF URL as a response to the client
  res.json({ pdfUrl });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
