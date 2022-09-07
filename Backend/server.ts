import express from "express";
// import path from "path";
import http from "http";
import expressSession from "express-session";
// import Knex from "knex";

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(
    expressSession({
        secret: "welcome to our website",
        resave: true,
        saveUninitialized: true,
    })
);

//knex setup
// import knexConfigs from "./knexfile";
// const configMode = process.env.Node_ENV || "development";
// const knexConfig = knexConfigs[configMode];
// const knex = Knex(knexConfig);

// server & controller set up

// route handling

const PORT = 8080;
const server = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`listening at http://localhost:${PORT}`);
});

