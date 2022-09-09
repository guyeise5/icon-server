import express from 'express';
import cors from 'cors'
import { URL } from 'url';
import path from 'path';
import { getIconBinaryData } from './lib/fetchIcon';

const port = Number(process.env.PORT) || 8080;
const app = express();
app.use(cors());

// // // Add headers
// app.use((req, res, next) => {
//     const origin = req.headers.origin;

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', "http://go");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', String(true));

//     // Pass to next layer of middleware
//     if (req.method === 'OPTIONS') {
//         return res.send(200);
//     } else {
//         next();
//     }
// });

// icon api
// usage: http://localhost:8080/icon/http://google.com
app.get("/icon/*", async (req, res) => {
    try {
        const url = new URL(req.params[0])
        const data = await getIconBinaryData(url.origin);

        if (data) {
            const buffer = Buffer.from(data.data, "binary")
            res.header("content-type", data.type)
            res.header("content-length", buffer.length + "")
            res.header('cache-control', `public, max-age=${3 * 24 * 60 * 60}`)
            res.send(buffer)
        } else {
            res.json({ ok: false }).status(400)
        }
    } catch (err: any) {
        res.status(400).json(err)
    }
});

// serve react build
app.use(express.static("./react-demo/dist"));

app.use('/', function (req, res) {
    res.sendFile(path.resolve(`./react-demo/dist/index.html`));
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
