import React, { useState } from "react";
// styles that we will apply
import "codemirror/lib/codemirror.css";
// the theme that we are going to use
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons";

// this is the text editor. It will work with onchange handlers etc
import { Controlled as ControlledEditor } from "react-codemirror2";

function Editor(props) {
    // desctructure props to obtain constants
    const { language, displayName, value, onChange } = props;

    // create a constant state that ensure all text editors are open
    const [open, setOpen] = useState(true);

    function handleChange(editor, data, value) {
        onChange(value);
    }

    return (
        // use string interpellation with a function to set an additional CSS Class to be applied if we need to collapse it. i.e. we are adding a class below...we just need to apply the CSS if appropriate
        <div className={`editor-container ${open ? "" : "collapsed"}`}>
            <div className="editor-title">
                {displayName}
                <button
                    type="button"
                    className="expand-collapse-btn"
                    // now toggle if we need to collapse one of the editors or not.
                    // we run a function that toggles the state
                    onClick={() => setOpen((prevOpen) => !prevOpen)}
                >
                    <FontAwesomeIcon
                        icon={open ? faCompressAlt : faExpandAlt}
                    />
                </button>
            </div>
            <ControlledEditor
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: "material",
                    lineNumbers: true,
                }}
            />
        </div>
    );
}

export default Editor;
