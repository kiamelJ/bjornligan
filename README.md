# Getting Started

## Install dependencies:
```bash
npm install next react react-dom @notionhq/client cookies-next react-datepicker
```

## What about access to Notion?
Create .env.local and paste the information provided

## Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result

## Link to Scrum Board

https://www.notion.so/Bj-rnligan-Board-d4c08e2cad2541b0928ab19d3e60536d


------------------------- CODE STRUCTURE ----------------------------------

1. BJORNLIGAN
   - components &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         # Contains all the components 
   - pages
        - api   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;           # API handling
            - login
            - people
            - project
            - timereport
        - project    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;        # Project page 
        - timereport &nbsp;&nbsp;&nbsp;&nbsp;     # Timereport page
        - userpage   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     # Userpage      
    - styles         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      # Contains all CSS
    - .env.local     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    # Needs to be created to access database
