import type { NextApiRequest, NextApiResponse } from "next";

declare const APP_SERVER_ADDRESS: string = "server address";

async function sendToApplication(
    data: JSON
) {
    var res : Response;
    try {
        res = await fetch(APP_SERVER_ADDRESS, {
            method: "GET",
            body: JSON.stringify(data),
        });
    } catch (err) {
        res = new Response();
    }

    return res;
}

export default function HandleRequest(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const data = JSON.parse(req.body);
        const result = await sendToApplication(data);

        if (!result.ok) {

        }

        
    } catch (err) {
        if (err instanceof Error) {
            res.status(200).
        }
    }
}