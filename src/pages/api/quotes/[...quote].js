import { Client } from '@notionhq/client'

export default async function handler(req, res) {
    const quoteId = "177721b9-9b10-4464-89cd-cab3f030a2bb";
    const databaseId = process.env.NOTION_DATABASE_ID;

    const notion = new Client({
        auth: process.env.NOTION_API_KEY
      });
    
  
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
            property: "id",
            id: {
              equals: quoteId,
            },
        }
    });
  
    if (response.results.length === 0) {
      return res.status(404).json({ message: "Quote not found" });
    }
  
    const quote = {
      id: response.results.id
    };
  
    res.status(200).json(quote);
  }