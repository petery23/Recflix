const express = require("express");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
app.use(express.json());

app.post("/recommendations", (req, res) => {
    const pythonPath = path.resolve("../python/main.py");
    const py = spawn("py", [pythonPath]);

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
            return res.status(500).json({ error: "Python process exited with code " + code, details: errorOutput });
        } 
        try {
            const json = JSON.parse(output);
            return res.json(json);
        } catch (error) {
            return res.status(500).json({ error: "Invalid JSON output" });
        }
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});