import { useEffect, useState } from "react";

export const useDate = () => {
    const locale = 'en';
    // set default to today's day
    const [today, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 60*1000) // update in every one min

        return () => {
            clearInterval(timer)
        }
    },[])

    // get today
    const day = today.toLocaleDateString(locale, {weekday: 'long'})
   // get today's date
    const date = `${day}, ${today.getDate()}, ${today.toLocaleDateString(locale, {month: 'short'})}\n\n`
   // get today's time
    const time = new Date().toLocaleTimeString('en-US',{hour:'numeric',hour12: true, minute: 'numeric'}); 

    return {
        date, time
    }
}