const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/search", (req, res) => {
    const pythonPath = path.resolve(__dirname, "../python/main.py");
    const pythonVenvPath = path.resolve(__dirname, "../python/venv/Scripts/python.exe");
    const py = spawn(pythonVenvPath, [pythonPath]);

    let output = "";
    let errorOutput = "";

    py.stdin.write(JSON.stringify(req.body));
    py.stdin.end();

    py.stdout.on("data", (data) => {
        output += data.toString();
    });

    py.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    py.on("close", (code) => {
        if (code !== 0) {
            console.error("Python process exited with code", code);
            console.error("Error output:", errorOutput);
            return res.status(500).json({ error: "Python process error", details: errorOutput });
        }
        try {
            const json = JSON.parse(output);
            return res.json(json);
        } catch (error) {
            console.error("Invalid JSON from Python:", output);
            return res.status(500).json({ error: "Invalid JSON output from Python script" });
        }
    });
});

app.post("/recommend", (req, res) => {
    const pythonPath = path.resolve(__dirname, "../python/main.py");
    const pythonVenvPath = path.resolve(__dirname, "../python/venv/Scripts/python.exe");
    const py = spawn(pythonVenvPath, [pythonPath]);

    let output = "";
    let errorOutput = "";

    py.stdin.write(JSON.stringify(req.body));
    py.stdin.end();

    py.stdout.on("data", (data) => {
        output += data.toString();
    });

    py.stderr.on("data", (data) => {
        errorOutput += data.toString();
    });

    py.on("close", (code) => {
        if (code !== 0) {
            console.error("Python process exited with code", code);
            console.error("Error output:", errorOutput);
            return res.status(500).json({ error: "Python process error", details: errorOutput });
        }
        try {
            const json = JSON.parse(output);
            return res.json(json);
        } catch (error) {
            console.error("Invalid JSON from Python:", output);
            return res.status(500).json({ error: "Invalid JSON output from Python script" });
        }
    });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});