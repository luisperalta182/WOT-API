import { Client } from '@notionhq/client'

export default async function handler(req, res) {
  const bookName = req.query.book_name.join(" ");
  const databaseId = process.env.NOTION_DATABASE_ID;

  const notion = new Client({ 
    auth: process.env.NOTION_API_KEY 
  });

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "book_name",
      title: {
        equals: bookName,
      },
    },
  });

  if (response.results.length === 0) {
    return res.status(404).json({ message: "Book not found" });
  }


  const quotes = response.results.map((quote) => ({
    quote: quote.properties.Quote.title[0].plain_text,
    quote_by: quote.properties.quote_by.rich_text[0].plain_text,
  }));

  res.status(200).json(quotes);
}

