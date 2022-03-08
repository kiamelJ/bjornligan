import {Client} from '@notionhq/client'

const TimereportComment = ({Timereports, Comment}) => {
    
    const TimereportID = Timereports[0].id;
    //console.log(TimereportID);
    //console.log(Comment);

    const notion = new Client({auth: process.env.NOTION_API_KEY});
    
    (async () => {
        
        const response = await notion.pages.update({
        page_id: TimereportID,
        properties: {
        'Kommentar': {
            rich_text: [
                {
                    text: {
                    content: "Comment",
                    },
                },
            ]
        },
        },
          
    })
    console.log(response);
    })();
    

    return (
      <></>
    );
  };
  
  export default TimereportComment;