const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { Quote, quote_by, book_name } = JSON.parse(req.body);
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        Quote: {
          title: [
            {
              text: {
                content: Quote,
              },
            },
          ],
        },
        quote_by: {
          rich_text: [
            {
              text: {
                content: quote_by,
              },
            },
          ],
        },
        book_name: {
          rich_text: [
            {
              text: {
                content: book_name,
              },
            },
          ],
        },
      },
      });
      res.status(201).json({ msg: 'Success' });
    } catch (error) {
      res.status(500).json({ msg: 'There was an error' });
    }
  }