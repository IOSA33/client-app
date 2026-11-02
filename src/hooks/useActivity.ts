import { useState } from "react"

// This needs somehow to use
// Basic idea that every function will call this one ex. "add" 
// and it will handle everything here
interface returnObject {
    kilometrs: number[];
    setKilometrs: React.Dispatch<React.SetStateAction<number[]>>;
}

export const useActivity = (): returnObject => {
    const [kilometrs, setKilometrs] = useState([2.3, 4.2]);

    return { kilometrs, setKilometrs }
}