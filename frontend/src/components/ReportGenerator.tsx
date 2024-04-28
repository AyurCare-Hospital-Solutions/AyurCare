import { Print } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { ReactElement, useEffect, useRef, useState } from "react";
import generatePDF, { Margin } from "react-to-pdf";

const ReportGenerator = ({ children, filename, title, visible, titleHidden }: { children: ReactElement | ReactElement[], visible?: boolean, titleHidden?: boolean, filename: string, title: string }) => {
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
            {isPrint || !titleHidden ? <Typography textAlign="center" variant="h6">{title}</Typography> : null}
            {children}
        </div> : null}
    </>
};


export default ReportGenerator;