import { Button } from "./button";

export function Navbar() {
    return <div className="h-20 bg-gray-500 rounded-b-2xl  w-full flex flex-row gap-20">
        <Button height="50px" color="red-700" content="Home" />
        <Button height="100px" color="red-700" width="1000px" content="Play" />
        <Button height="100px" color="blue-700" width="1000px" content="Rules" />
        <Button height="100px" color="red-700" width="1000px" content="About" />
    </div>
}