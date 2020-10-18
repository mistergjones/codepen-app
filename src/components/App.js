import React, { useState, useEffect } from "react";
import Editor from "./Editor";

// utilise the custom hook for storing values in local storage
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
    const [html, setHTML] = useLocalStorage("html", "");
    const [css, setCSS] = useLocalStorage("css", "");
    const [js, setJS] = useLocalStorage("js", "");

    const [srcDoc, setSrcDoc] = useState("");
    // create a timer to update the page every .250 seconds
    // anytime, out HTML,CSS, JS changes...run the timeout and then refresh
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <html>
                <body>${html}</body>
                <style>${css}</style>
                <script>${js}</script>
            </html>
        `);
        }, 250);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <>
            <div className="pane top-pane">
                <Editor
                    language="xml"
                    displayName="HTML"
                    value={html}
                    onChange={setHTML}
                />
                <Editor
                    language="xml"
                    displayName="CSS"
                    value={css}
                    onChange={setCSS}
                />
                <Editor
                    language="xml"
                    displayName="JavaScript"
                    value={js}
                    onChange={setJS}
                />
            </div>
            <div className="pane">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                ></iframe>
            </div>
        </>
    );
}

export default App;
