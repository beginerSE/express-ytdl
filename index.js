const express = require('express');
const cors = require('cors');
const ytdl = require("ytdl-core");
const app = express();
app.use(cors());
app.listen(3000, () => {
    console.log('Server Works !!! At port 3000');
});

app.get('/', (req, res) => {
    res.send('ページが表示されました！')
})


app.get("/download", (req, res) => {
    var URL = req.query.url;
    console.log("url", URL);
    var stream = ytdl(URL);
    stream.on('info', (info) => {
        console.log(info.title);
        console.log(info.video_id);
        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(URL, {
            format: 'mp4'
        }).pipe(res);
    });
});