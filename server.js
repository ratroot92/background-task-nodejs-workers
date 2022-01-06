const server = (QUEUE) => async (req, res) => {
    const urlParts = req.url.split('/');
    const email = {
        to: decodeURI(urlParts[1]),
        subject: decodeURI(urlParts[2]),
        text: decodeURI(urlParts[3]),
    };
    const isQueued = await QUEUE.enqueue('emailQueue', 'sendEmail', email);
    const response = { email, isQueued };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(response, null, 2));
};

module.exports = server;
