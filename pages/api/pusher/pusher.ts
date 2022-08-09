import { NextApiHandler } from "next";
import Pusher from"pusher";

require('dotenv').config()
const handler: NextApiHandler = (req, res) => {
  const pusher = new Pusher({
    appId: process.env['PUSHER_APP_ID']!,
    key: process.env['PUSHER_KEY']!,
    secret: process.env['PUSHER_SECRET']!,
    cluster: process.env['PUSHER_CLUSTER']!,
    useTLS: true
  });

  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  res.end()
}
export default handler