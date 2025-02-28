import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Utility function to remove markdown symbols like asterisks and underscores.
function cleanText(text) {
  return text.replace(/[*_]/g, '');
}

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }
    
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Google AI API key is not configured." });
    }
    
    // Construct the endpoint URL using your API key.
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    // Build the payload exactly as required by the API.
    const payload = {
      contents: [
        {
          parts: [{ text: question }]
        }
      ]
    };

    const response = await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" }
    });

    // // Log full response for debugging.
    // console.log("Google AI Response:", JSON.stringify(response.data, null, 2));

    const candidates = response.data.candidates;
    let answer = "No answer received.";
    if (
      candidates &&
      candidates.length > 0 &&
      candidates[0].content &&
      candidates[0].content.parts &&
      candidates[0].content.parts.length > 0 &&
      candidates[0].content.parts[0].text
    ) {
      answer = candidates[0].content.parts[0].text;
    }
    
    // Clean the answer by removing asterisks and underscores.
    const cleanedAnswer = cleanText(answer);
    
    res.json({ answer: cleanedAnswer });
  } catch (error) {
    console.error("Error in chatbot route:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to get response from Google AI Studio" });
  }
});

export default router;
