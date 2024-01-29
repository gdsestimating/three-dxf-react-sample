import { useState, useRef, useEffect } from "react";
import DxfViewer from "./DxfViewer.jsx";
import DxfParser from "dxf-parser";
import "./app.css"

var dxfParser = new DxfParser();

export default function App() {

    const dropAreaElement = useRef();

    let [ dxf, setDxf ] = useState(null);
    let [ uploadProgress, setUploadProgress ] = useState(null);

    useEffect(() => {
        const dropArea = dropAreaElement.current;
        dropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        });
        dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onprogress = evt => setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
                reader.onloadend = evt => setUploadProgress(null);
                reader.onabort = evt => { setUploadProgress('upload aborted. See console for details'); }
                reader.onerror = evt => { setUploadProgress('upload error. See console for details.'); }
                reader.onloadend = (event) => {
                    try {
                        setUploadProgress(null);
                        setDxf(dxfParser.parseSync(event.target.result));
                    } catch(err) {
                        alert("Failed to parse DXF file: " + err.message + ". See console for details.");
                    }
                };
                reader.readAsText(file);
            }
        });
    }, []);

    return (
        <div>
            <h1>My React App!</h1>
            <div ref={dropAreaElement} className="dropArea">
                <div style={{display: 'inline-block' }}>
                <p>Drop DXF here</p>
                <p>{uploadProgress}</p>
                </div>
            </div>
            <DxfViewer width={500} height={500} clearColor={0xCCCCCC} dxf={dxf} />
        </div>
    );
}