"use client";
import { useState } from "react";
import Calendar from 'react-calendar';
import getFlightData from "../utils/getFlightData"

export default function FlightForm() {
    const [origin, setOrigin] = useState();
    const [destination, setDestination] = useState();
    const [departureDate, setDepartureDate] = useState();
    const [departureCalendar, setDepartureCalendar] = useState(false);
    console.log(departureDate);

    const flightInfo = [];

    const handleOnClick = async(e) => {
        e.preventDefault();
        const outgoing = {
            origin,
            destination,
            departureDate: "2023-09-11",
        };
        const incoming = {
            origin: destination,
            destination: origin,
            departureDate: "2023-10-09",
        };
        flightInfo.push(outgoing, incoming)
        console.log(flightInfo);
        await getFlightData(flightInfo);
    }
    

  return (
    <div >
        <form className="grid grid-cols-12 p-10 gap-4" >
        <input className="bg-gray-100 rounded p-5 col-span-3" onChange={(e)=>setOrigin(e.target.value)} placeholder="From?"/>
        <input className="bg-gray-100 text-black rounded p-5 col-span-3" onChange={(e)=>setDestination(e.target.value)} placeholder="To?"/>
        <input className="bg-gray-100 text-black rounded p-5 col-span-2" onClick={()=>setDepartureCalendar(true)} value={departureDate ? departureDate : null} placeholder="Departing"/>
        <input className="bg-gray-100 text-black rounded p-5 col-span-2" placeholder="Return"/>
        <button className="bg-white text-black rounded col-span-2" onClick={(e)=>handleOnClick(e)}>Search</button>
        {departureCalendar ?
        <div className="w-screen flex justify-center">
        <Calendar className="w-[50vw] h-[20vh] flex flex-col items-center justify-center bg-white text-black rounded" onChange={setDepartureDate}/>
        </div> : null}
        </form>
    </div>
  );
}
