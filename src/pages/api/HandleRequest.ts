import type { NextApiRequest, NextApiResponse } from "next";

const APP_SERVER_URL: string = "server address";
var seq : number = 0;

async function sendToApplication(
    data: JSON
) {
    var res : Response;
    try {
        res = await fetch(APP_SERVER_URL, {
            method: "GET",
            body: JSON.stringify(data),
        });
    } catch (err) {
        res = Response.error();
    }

    return res;
}

export default async function HandleRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = JSON.parse(req.body);

        // Preprocessing if needed
        data.seq = seq;
        seq++;

        const result = await sendToApplication(data);

        if (!result.ok) {
            res.status(result.status).json(result.body);
        } else {
            res.status(200).json(result.body);
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send("Unknown error. ");
        }
    }
}