//Todo..in med data från Forms.

import { Client } from '@notionhq/client'
export default function Home() {
    return (
        <>
        </>
    )
}

export async function getServerSideProps() {

    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    const timereports = process.env.NOTION_DATABASE_ID_TIMEREPORTS;

    const response = await notion.pages.create({
        parent: {
            database_id: timereports,
        },
        properties: {
            Note: {
                title: [
                    {
                        text: {
                            content: "björn"
                        }
                    }
                ]
            },
            Hours: {
                number: 999
            },
            Date: {
                date: {
                    start: "2016-09-18"
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
    console.log(response)
    return {
        props: {}
    }
}