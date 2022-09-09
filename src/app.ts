import express from 'express';
import cors from 'cors'
import { URL } from 'url';
import { getIconBinaryData } from './lib/fetchIcon';

const app = express();
const port = 8080;

app.get('/', (_, res) => {
    res.send(`<html>
    <body>
        <img src='http://localhost:8080/icon/https://github.com/Guyeise1/icon-server/'/>
        <img src='http://localhost:8080/icon/http://stackoverflow.com'/>
        <img src='http://localhost:8080/icon/http://google.com'/>
    </body>
    </html>`);
});

// usage: http://localhost:8080/icon/http://google.com
app.get("/icon/*", cors(), async (req, res) => {
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

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
