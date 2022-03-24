import react from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormTimeReport from "../Reports/ReportPage";
import { setCookies, getCookie, checkCookies } from "cookies-next";
import router from "next/router";
import { useRouter } from 'next/router'

import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";





const ProjectList = () => {
    const[project, setProject] = useState();
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState();

    const {query} = useRouter();

    console.log(query);

    
    useEffect(async () => {
        if(query != "")
        {
            console.log("finns")
            await fetch("../api/project/specificproject", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(query),
              })
            .then((res) => res.json())
                .then((data) => {
                setData(data);
                setLoading(false)
                console.log(data);
                })
        }
    }, []);
    

    if (isLoading) return <p>Loading...</p>;
    if (!data) return <p>No profile data</p>;

    console.log(data);


    return(
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalhours" fill="#8884d8" />
          <Bar dataKey="workedhours" fill="#82ca9d" />
          <Bar dataKey="hoursleft" fill="#AF03DB" />
        </BarChart>
    )
  
};

export default ProjectList;

