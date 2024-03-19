import { SetStateAction, useEffect, useState } from "react";
import WardTable from "./components/WardTable";
import axios from "axios";

const Ward = () => {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        axios.get("http://localhost:5000/api/icms/ward").then((res: { data: SetStateAction<undefined>; }) => {
            setTimeout(() => setData(res.data), 1000);
        })
    }, [])

    return <><WardTable data={data}></WardTable></>
}

export default Ward;