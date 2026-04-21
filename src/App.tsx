import { useEffect, useRef } from "react";
import { Navbar } from "./components/navbar";
import "./index.css";
import { Canvas } from "./components/canvas";


export function App() {
    return (
        <div className="bg-gray-400 h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="flex justify-center align-middle h-full w-full">
                <Canvas/>
            </div>
      </div>
  );
}

export default App;
