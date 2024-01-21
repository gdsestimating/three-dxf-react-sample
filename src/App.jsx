import DxfViewer from "./DxfViewer.jsx";

export default function App() {
    return (
        <div>
            <h1>My React App!</h1>
            <DxfViewer width={200} height={200} clearColor={0xFFFFFF} />
        </div>
    );
}