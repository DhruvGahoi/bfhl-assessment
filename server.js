require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

const FULL_NAME = (process.env.FULL_NAME).toLowerCase().replace(/\s+/g, "_");
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY;
const EMAIL = process.env.EMAIL;
const ROLL_NUMBER = process.env.ROLL_NUMBER;


function isDigitsOnly(str) {
  return /^[0-9]+$/.test(str);
}
function isLettersOnly(str) {
  return /^[A-Za-z]+$/.test(str);
}
function toAlternatingCapsReversed(allAlpha) {
  const rev = allAlpha.split("").reverse().join("");
  let out = "";
  for (let i = 0; i < rev.length; i++) {
    out += i % 2 === 0 ? rev[i].toUpperCase() : rev[i].toLowerCase();
  }
  return out;
}

app.get("/", (req, res) => {
  res.json({ message: "BFHL API is running. Use POST /bfhl" });
});

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        odds: [],
        evens: [],
        alphabets: [],
        specialChar: [],
        sum: "0",
        concat_string: ""
      });
    }

    const odds = [];
    const evens = [];
    const alphabets = [];
    const specialChar = [];
    let sumNumbers = 0;
    let allAlphabeticalChars = "";

    data.forEach((item) => {
      const str = String(item);
      const letters = str.match(/[A-Za-z]/g);
      if (letters) allAlphabeticalChars += letters.join("");

      if (isDigitsOnly(str)) {
        const num = Number(str);
        sumNumbers += num;
        if (num % 2 === 0) {
          evens.push(str);
        } else {
          odds.push(str);
        }
      } else if (isLettersOnly(str)) {
        alphabets.push(str.toUpperCase());
      } else {
        specialChar.push(str);
      }
    });

    const concat_string = toAlternatingCapsReversed(allAlphabeticalChars);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odds,
      evens,
      alphabets,
      specialChar,
      sum: String(sumNumbers),
      concat_string,
    });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(200).json({
      is_success: false,
      user_id: `${FULL_NAME}_${DOB_DDMMYYYY}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odds: [],
      evens: [],
      alphabets: [],
      specialChar: [],
      sum: "0",
      concat_string: ""
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFHL API running on port ${PORT}`));
