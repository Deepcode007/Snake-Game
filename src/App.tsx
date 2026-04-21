import { createContext, useState, type ReactNode } from "react";
import { Navbar } from "./components/navbar";
import "./index.css";
import { Canvas } from "./components/canvas";

export interface SnakeSegment {
    x: number,
    y: number
}

export interface GlobalContextType {
    snake: SnakeSegment[];
    setSnake: React.Dispatch<React.SetStateAction<SnakeSegment[]>>;
    food: { x: number; y: number };
    setFood: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export const grid_size = 25;
export const GlobalContext = createContext<GlobalContextType | null>(null);
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [snake, setSnake] = useState([
        { x: 0, y: 0 },
    ]);
    const [food, setFood] = useState({ x: 1, y: 1 });

    return (
        <GlobalContext.Provider value={{ snake, setSnake, food, setFood }}>
            {children}
        </GlobalContext.Provider>
    );
};

export function App() {
    return (
        <GlobalProvider>
            <div className="bg-gray-400 h-screen flex flex-col">
                <Navbar></Navbar>
                <div className="flex justify-center items-center h-full w-full bg-amber-600">
                    <Canvas />
                </div>
            </div>
        </GlobalProvider>
    );
}

export default App;
