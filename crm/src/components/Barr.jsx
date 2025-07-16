import React from "react";

import { BarChart , XAxis , YAxis,Tooltip,Legend,ResponsiveContainer,Bar } from "recharts";

  const data = [
  {
    name: "Dadar",
    Enrolled: 50,
    Interested: 80,
    InterestedLater: 40,
    NonContactable: 500,
    NotInterested: 1000,
    Open: 700,
    Rejected: 30
  },
  {
    name: "Andheri",
    Enrolled: 40,
    Interested: 100,
    InterestedLater: 60,
    NonContactable: 400,
    NotInterested: 900,
    Open: 600,
    Rejected: 50
  },
  {
    name: "Thane",
    Enrolled: 70,
    Interested: 90,
    InterestedLater: 30,
    NonContactable: 600,
    NotInterested: 950,
    Open: 800,
    Rejected: 20
  },
  {
    name: "Bandra",
    Enrolled: 60,
    Interested: 70,
    InterestedLater: 50,
    NonContactable: 550,
    NotInterested: 1000,
    Open: 750,
    Rejected: 25
  }
];

const COLORS = {
  Enrolled: "#F87171",                  
  Interested: "#3B82F6",       
  InterestedLater: "#FACC15", 
  NonContactable: "#14B8A6",   
  NotInterested: "#A855F7",    
  Open: "#FB923C",             
  Rejected: "#22C55E"          
};
const Barr = () =>{
  return(
    <>
     <div className="p-6 bg-white shadow-lg rounded-lg w-[20px] max-2-auto mx-auto mt-6">
       <h2 className="text-2xl font-bold text-center">Lead Breakup Chart</h2>
       <ResponsiveContainer width={"100%"} height={300}>
          <BarChart data={data} margin={{top: 20, right: 3, left: 2, bottom: 5}}>
           <XAxis dataKey="name"></XAxis>
           <YAxis></YAxis>
           <Tooltip />
            <Legend />
            {
              Object.keys(COLORS).map((key)=>(
                <Bar key={key} dataKey={key} stackId="a" fill={COLORS[key]} barSize={20}></Bar>
              ))
            }
          </BarChart>
       </ResponsiveContainer>
     </div>
    </>
  )
}

export default Barr;