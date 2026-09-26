const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let emails = [];

function generateEmail() {
    const random = Math.random().toString(36).substring(2, 10);
    return `${random}@tempdemo.com`;
}

app.get("/api/new-email", (req, res) => {
    const email = generateEmail();

    emails.push({
        email: email,
        messages: []
    });

    res.json({ email });
});

app.get("/api/inbox/:email", (req, res) => {
    const account = emails.find(
        x => x.email === req.params.email
    );

    res.json(account ? account.messages : []);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
