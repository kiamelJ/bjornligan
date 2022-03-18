const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = `${process.env.NOTION_DATABASE_ID_TIMEREPORTS}`;
const personId = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;


export default async function handler(req, res) {
    const { method } = req;
    console.log("request.body: ", req.body);
    
    if (method === "POST") {
        const response = await notion.blocks.delete({
          block_id: req.body,
        });
        res.status(200).json({ response });
      }
  }
  