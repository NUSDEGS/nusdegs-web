import type { NextApiRequest, NextApiResponse } from "next";

const APP_SERVER_URL: string = "http://127.0.0.1:8000/get_plans/";
var seq : number = 0;

async function sendToApplication(
    data: JSON
) {
    try {
        const res = await fetch(APP_SERVER_URL, {
            method: "POST",
            headers: {
                "origin": "localhost:3000",
                "content-type": "application/json",
            },
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

        const data = req.body;

        // Preprocessing if needed
        data.id = seq;
        seq++;

        const result = await sendToApplication(data);

        if (!result.ok) {
            res.status(500).send(result);
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
            res.status(500).send(err.message);
        }
    }
}