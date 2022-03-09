import React from 'react'
import { Client } from '@notionhq/client'


const TimereportCreate = () => {

    const newReport = async event => {
        event.preventDefault();

        console.log("1");
        const notion = new Client({ auth: process.env.NOTION_API_KEY });

        const databaseId = process.env.NOTION_DATABASE_ID_TIMEREPORTS;


        console.log("2");
        const response = await notion.pages.create({
            parent: {
                database_id: databaseId,
            },
            properties: {
                Note: {
                    title: [
                        {
                            text: {
                                content: "event.target.note.value"
                            }
                        }
                    ]
                },
                Hours: {
                    number: 12
                },
                Date: {
                    date: {
                        start: "2012-02-02"
                    }
                },
                Project: {
                    relation: [
                        {
                            id: "a404d585c7504640a49cbda90e367de7"
                        }

                    ]

                },
                Person: {
                    relation: [{
                        id: "b96d6bb1c88641e4b77182bad0bffae2"
                    }]
                }
            }
        }
        );

        console.log("3");
        console.log(response);

    }

    return (
        <form onSubmit={newReport}>
            <label htmlFor="note">Note</label>
            <input id="note" name="note" type="text" autoComplete="note" required />
            <label htmlFor="hours">Hours</label>
            <input id="hours" name="hours" type="text" autoComplete="hours" required />
            <label htmlFor="date">Date</label>
            <input id="date" name="date" type="text" autoComplete="date" required />
            <button type="submit">Register</button>
        </form>
    )
}

export default TimereportCreate

