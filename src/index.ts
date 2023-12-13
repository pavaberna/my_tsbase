import http, { IncomingMessage, ServerResponse } from "http"
import fs from "fs/promises"

const sleep = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 3000))

const requestListenerFunction = async (req: IncomingMessage, res: ServerResponse) => {

    await sleep()

    if (req.url === "/script.js") {
        const script = await fs.readFile(`${__dirname}/../public/script.js`, "utf-8")
        res.write(script)
        res.end()
        return
    }

    if (req.url === "/") {
        const html = await fs.readFile(`${__dirname}/../public/index.html`, "utf-8")
        res.write(html)
        res.end()
        return
    }

    if (req.url === "/data/all") {
        const data = await fs.readFile(`${__dirname}/../public/database.json`, "utf-8")
        res.write(data)
        res.end()
        return
    }

    if (req.url === "/data.js") {
        const data = await fs.readFile(`${__dirname}/../public/database.json`, "utf-8")
        const script = "const data = " + data + "; console.log(data)"
        res.write(script)
        res.end()
        return
    }

    res.write("<h1>not found</h1>")
    res.end()
}

http.createServer(requestListenerFunction).listen(3000)