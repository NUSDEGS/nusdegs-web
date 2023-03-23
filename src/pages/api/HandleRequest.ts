import type { NextApiRequest, NextApiResponse } from "next";

declare const APP_SERVER_URL: string = "server address";

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

export default function HandleRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = JSON.parse(req.body);

        // Preprocessing if needed

        const result = await sendToApplication(data);

        if (!result.ok) {
            res.status(200).json(result);
        }


    } catch (err) {
        if (err instanceof Error) {
            res.status(500).send("Unknown error. ");
        }
    }
}