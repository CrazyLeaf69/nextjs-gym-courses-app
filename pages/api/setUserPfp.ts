// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import excuteQuery from "../../lib/db";
import { sessionOptions } from "../../lib/session";

type Body = {
  UserId: number;
  pfpUrl: string;
};

export default withIronSessionApiRoute(pfphandler, sessionOptions);

async function pfphandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body: Body = JSON.parse(req.body);

    const queryDb = await excuteQuery({
      query: `UPDATE Users SET ProfilePicture = '${body.pfpUrl}' WHERE UserId = ${body.UserId};`,
      values: "",
    });

    if (queryDb.affectedRows == 1) {
      if (req.session.user != undefined) {
        req.session.user.ProfilePicture = body.pfpUrl;
        await req.session.save();
      }
      res.status(200).send("success");
    } else {
      res.status(500).send("error");
    }
  } catch (error) {
    console.log(error);
  }
}
