import parse from "html-react-parser";

function MyComponent() {
  const htmlContent = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="x-ua-compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
            <noscript>
                <meta http-equiv="refresh" content="0;url=http://www70.newurl.com/" />
            </noscript>
            <meta http-equiv="refresh" content="5;url=http://www70.newurl.com/" />
        </head>
        <body onload="do_onload()">
            <script type="text/javascript">
                function do_onload() {
                    window.top.location.href = "https://api.newurl.com/predict?gp=1&js=1&uuid=1715462038.0020445152&other_args=eyJ1cmkiOiAiL3ByZWRpY3QiLCAiYXJncyI6ICIiLCAicmVmZXJlciI6ICIiLCAiYWNjZXB0IjogImFwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKiJ9";
                }
            </script>
        </body>
    </html>`;

  return <div>{parse(htmlContent)}</div>;
}

export default MyComponent;
