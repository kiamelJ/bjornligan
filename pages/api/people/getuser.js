const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const peopleID = `${process.env.NOTION_DATABASE_ID_PEOPLE}`;

export default async function Handler(req, res) {

    console.log(1);
    const userData = await notion.pages.retrieve({
      page_id: req.body,
    });
    console.log(userData)
    res.status(200).json(userData);
  
}
