import React from 'react';
import { Client } from "@notionhq/client";

const index = ({results}) => {

  const getDatabaseDisplay = () =>{
    let jsx = [];
    results.forEach((element) => {
      jsx.push(
        <div className="card" key={element.id}>
          <p>{element.properties.Quote.title[0].plain_text}</p>
          <p>{element.properties.book_name.rich_text[0].plain_text}</p>
        </div>
      )
    });
    return jsx;
  }

  return (
    <div>
      {/* {getDatabaseDisplay()} */}

      {results.map((result, i)=>{
          return(
            <div className="card" key={i}>
              <p>{result.properties.Quote.title[0].plain_text}</p>
              <p>{result.properties.book_name.rich_text[0].plain_text}</p>
            </div>
          )
      })

      }
    </div>
  )
}

export default index

export async function getStaticProps(){
  
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  })

  console.log(response)

  return{
    props: {
      results: response.results,
    }
  }
}