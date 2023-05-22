import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getBooks() {
    const databaseId = process.env.NOTION_DATABASE_ID;
  
    const response = await notion.databases.query({ database_id: databaseId });
  
    const books = response.results.reduce((acc, page) => {
      const book = page.properties.book_name.rich_text[0].plain_text;
  
      if (!acc.includes(book)) {
        acc.push(book);
      }
  
      return acc;
    }, []);

    return books;
}


export async function getRandom(){
    
    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.databases.query({ database_id: databaseId });

    const quotes = response.results.map((page) => ({
        quote: page.properties.Quote.title[0].plain_text,
        quoteBy: page.properties.quote_by.rich_text[0].plain_text,
        bookName: page.properties.book_name.rich_text[0].plain_text,
    }));

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return randomQuote;
}


export async function getAuthors() {
  const databaseId = process.env.NOTION_DATABASE_ID;

  const response = await notion.databases.query({ database_id: databaseId });

  const authors = response.results.reduce((acc, page) => {
    const quoteBy = page.properties.quote_by.rich_text[0].plain_text;

    if (!acc.includes(quoteBy)) {
      acc.push(quoteBy);
    }

    return acc;
  }, []);

//   const authors = response.results.reduce((acc, page) => {
//     const quoteBy = page.properties.quote_by.rich_text[0].plain_text;

//     if (!acc[quoteBy]) {
//       acc[quoteBy] = [];
//     }

//     acc[quoteBy].push({
//       id: page.id,
//       quote: page.properties.Quote.title[0].plain_text,
//       book_name: page.properties.book_name.rich_text[0].plain_text,
//     });

//     return acc;
//   }, {});


  return authors;
}

