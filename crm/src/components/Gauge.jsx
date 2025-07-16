import React from "react";
import ReactSpeedometer from "react-d3-speedometer";


const Gauge = () => {
    return(
       <>
       <div className="w-full h-full rounded-[1rem] mr-6">
           <h2 className="font-semibold text-xl">Enrolled Status</h2>
           <ReactSpeedometer
            maxValue={2000}
            value={1200}
            segments={6}
            segmentColors={["#FF0000", "#FF7F00", "#FFFF00", "#7FFF00", "#00FF00", "#00FFFF"]}
            customSegmentStops={[0,200,700,1200,1800,2000]}
            needleColor="#333"
            currentValueText="${value}"
            ringWidth={30}
            width={300}
            height={180}
           >

           </ReactSpeedometer>
       </div>
       </>
    )
}

export default Gauge;
