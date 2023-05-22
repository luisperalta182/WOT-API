import React from 'react';
import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY
  });

  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const wotData = response.results.map((page) => ({
    // id: page.id,
    quote: page.properties.Quote.title[0].plain_text,
    author: page.properties.quote_by.rich_text[0].plain_text,
    book: page.properties.book_name.rich_text[0].plain_text,
  }));

  res.status(200).json(wotData);
}