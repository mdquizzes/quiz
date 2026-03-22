const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// 🔴 CHANGE THESE
const TOKEN = "YOUR_GITHUB_TOKEN";
const OWNER = "mdquizzes";
const REPO = "mdquizzes";

// ===== SAVE API =====
app.post("/save", async (req, res) => {

const { section, content } = req.body;

const path = `quiz-data/paper/section${section}.js`;

try {

// GET FILE SHA
const file = await axios.get(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
{
headers: { Authorization: `token ${TOKEN}` }
}
);

const sha = file.data.sha;

// UPDATE FILE
await axios.put(
`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
{
message: `Update Section ${section}`,
content: Buffer.from(content).toString("base64"),
sha: sha
},
{
headers: { Authorization: `token ${TOKEN}` }
}
);

res.send("✅ Saved to GitHub");

} catch (err) {
console.error(err.response?.data || err);
res.send("❌ Error saving file");
}

});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
