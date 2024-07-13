const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { sendmail } = require("./mail");
require("dotenv").config();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use(cors());
const PORT = process.env.PORT || 8080;

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get all referrals
app.get("/referrals", async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();

    res.json(referrals);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new referral with validation
app.post("/referrals", async (req, res) => {
  const { referrer_name, referrer_email, referee_name, referee_email } =
    req.body;

  // Manual validation
  if (!referrer_name) {
    return res.status(400).json({ error: "Referrer name is required" });
  }
  if (!referrer_email || !isValidEmail(referrer_email)) {
    return res.status(400).json({ error: "Valid referrer email is required" });
  }
  if (!referee_name) {
    return res.status(400).json({ error: "Referee name is required" });
  }
  if (!referee_email || !isValidEmail(referee_email)) {
    return res.status(400).json({ error: "Valid referee email is required" });
  }

  try {
    const referral = await prisma.referral.create({
      data: {
        referrer_name,
        referrer_email,
        referee_name,
        referee_email,
      },
    });
    console.log(referral);

    sendmail(
      referrer_name,
      referee_name,
      referee_email,
      referral.referrer_code
    );
    res.json(referral);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
