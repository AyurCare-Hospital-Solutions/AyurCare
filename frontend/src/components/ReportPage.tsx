import { Print } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ReactElement, useEffect, useRef, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";

const ReportPage = ({ children, filename, title, visible }: { children: ReactElement | ReactElement[], visible?: boolean, filename: string, title: string }) => {
    const [isPrint, setIsPrinting] = useState(false);

    useEffect(() => {
        if (isPrint) {
            generatePDF(ref, { filename: filename, page: { margin: Margin.SMALL } })
            setIsPrinting(false);
        }
    }, [isPrint]);

    const ref = useRef<any>();
    return <>
        <Button onClick={() => setIsPrinting(true)} startIcon={<Print />}>Download</Button>
        {isPrint || visible ? <div ref={ref} style={{ padding: "4em 2em" }}>
            <Typography textAlign="center" variant="h6">{title}</Typography>
            {children}
        </div> : null}
    </>
};


export default ReportPage;