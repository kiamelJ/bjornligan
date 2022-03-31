## Getting Started

Install dependencies:
npm install next react react-dom @notionhq/client cookies-next react-datepicker

What about access to Notion?
Create .env.local and paste the information provided

Run the development server:
npm run dev

Open [http://localhost:3000] with your browser to see the result.

## Link to Scrum Board

https://www.notion.so/Bj-rnligan-Board-d4c08e2cad2541b0928ab19d3e60536d


------------------------- CODE STRUCTURE ----------------------------------

\BJORNLIGAN
    \components         # Contains all the components 
    \pages
        \api            # API handling
            \login
            \people
            \project
            \timereport
        \project        # Project page 
        \timereport     # Timereport page
        \userpage       # Userpage      
    \styles             # Contains all CSS
    .env.local          # Needs to be created to access database
