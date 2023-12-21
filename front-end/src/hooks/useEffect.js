import { useEffect, useState } from "react";
import instance from "../API";

export const UseEffect = async (url) => {
    // const [data, setData] = useState()

    useEffect(() => {
        async function name() {
            try {
                const { data } = await instance.get(url);
                // setData(data)
                return data
            } catch (error) {
                return error.message
            }
        }
        name()
    }, [])
    // try {
    //         const { dataa } = await instance.get(url);

    //         setData(data[0])
    //      return  data   
    //     } catch (error) {
    //         return error.message
    //     }
    

}