import express from 'express';
import axios from 'axios';
import cors from 'cors'

var getFavicons = require('get-website-favicon')
const app = express();
const port = 8080;
app.use(cors())
app.get('/', cors(), (_, res) => {
  res.send('Hello World!');
});

app.get("/:path", async (req,res) => {
    const url = req.params.path
    try {
        const data = await getFavicons(url)
        const icon = data?.icons[0]
        if(icon) {
            console.log(icon)
            const resp = (await axios.get(icon.src, {responseType: 'arraybuffer'}))
            const buffer = Buffer.from(resp.data, "binary")
            res.header("content-type", icon.type)
            res.header("content-length", buffer.length + "")
            res.send(buffer)
        } else {
          res.json({ok: false}).status(400)
        }
    } catch(err: any) {
        res.status(400).json(err)
    }
    
})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
