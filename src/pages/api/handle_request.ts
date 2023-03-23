import type { NextApiRequest, NextApiResponse } from "next";

const APP_SERVER_URL: string = "server address";
var seq : number = 0;

async function sendToApplication(
    data: Object
) {
    try {
        const res = await fetch(APP_SERVER_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });

        return await res.json();
    } catch (err) {
        throw err;
    }
}

export default async function HandleRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method != "POST") {
            throw new Error("Operation not allowed.");
        }

        const data = JSON.parse(req.body);

        // Preprocessing if needed
        data.seq = seq;
        seq++;

        const result = await sendToApplication(data);

        if (!result.ok) {
            res.status(500).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send(err.message);
        }
    }
}