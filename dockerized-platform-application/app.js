const express = require("express");
const path = require("path");
const os = require("os");

const app = express();

const startTime = new Date();

app.use(express.static("public"));

app.get("/api/dashboard", (req, res) => {
    res.json({
        status: "Running",
        hostname: os.hostname(),
        platform: os.platform(),
        architecture: os.arch(),
        cpuCores: os.cpus().length,
        totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
        freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + " GB",
        uptime: Math.floor(os.uptime() / 60) + " Minutes",
        environment: process.env.NODE_ENV || "Development",
        deployment: "Docker Ready",
        startedAt: startTime
    });
});

app.get("/health", (req, res) => {
    res.send("Application Healthy ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
==========================================
🚀 Dockerized DevOps Dashboard
==========================================
🌐 Running on Port ${PORT}
🐳 Container Ready
==========================================
`);
});