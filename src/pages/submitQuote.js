import { useState } from "react";

import notion from "../utils/notion_api";

export default function Submit() {
  const [Quote, setQuote] = useState("");
  const [quote_by, setQuoteBy] = useState("");
  const [book_name, setBook] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    //   const response = await notion.pages.create({
    //     parent: {
    //       database_id: process.env.NOTION_DATABASE_ID},
    //     properties: {
    //       Quote: {
    //         title: [
    //           {
    //             text: {
    //               content: quote,
    //             },
    //           },
    //         ],
    //       },
    //       quote_by: {
    //         rich_text: [
    //           {
    //             text: {
    //               content: quoteBy,
    //             },
    //           },
    //         ],
    //       },
    //       book_name: {
    //         rich_text: [
    //           {
    //             text: {
    //               content: book,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //   });

    const res = await fetch('http://localhost:3000/api/submitForm', {
        method: 'POST',
        body: JSON.stringify({ Quote, quote_by, book_name }),
      });


    // const response = await fetch('/api/pages', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       parent: {
    //         database_id: process.env.NOTION_DATABASE_ID,
    //       },
    //       properties: {
    //         quote: {
    //           title: [
    //             {
    //               text: {
    //                 content: quote,
    //               },
    //             },
    //           ],
    //         },
    //         quote_by: {
    //           rich_text: [
    //             {
    //               text: {
    //                 content: quoteBy,
    //               },
    //             },
    //           ],
    //         },
    //         book: {
    //           rich_text: [
    //             {
    //               text: {
    //                 content: book,
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     }),
    // })

      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Quote:
        <input
          type="text"
          value={Quote}
          onChange={(event) => setQuote(event.target.value)}
        />
      </label>
      <label>
        Quote by:
        <input type="text" value={quote_by} onChange={(event) => setQuoteBy(event.target.value)} />
      </label>
      <label>
        Book:
        <input  type="text" value={book_name} onChange={(event) => setBook(event.target.value)}  />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
