import "dotenv/config";
import path from "path";
import express from "express";

const app = express();
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: false }));

// http://expressjs.com/en/api.html#express.json
app.use(express.json({ limit: import.meta.env.VITE_APP_APILIMIT }));

app.use("/call", require("./routes/call"));
app.use("/upload", require("./routes/upload"));
app.use("/get-signed-url", require("./routes/getSignedURL"));

if (import.meta.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"));
    });
}

const SERVER_PORT = import.meta.env.VITE_APP_SERVER_PORT;

app.listen(SERVER_PORT, () => {
    console.log(`\n name: ${import.meta.env.VITE_APP_NAME} `);
    console.log(` env: ${import.meta.env.NODE_ENV} `);
    console.log(
        `Server running on localhost:${import.meta.env.VITE_APP_SERVER_PORT}\n`
    );
});
