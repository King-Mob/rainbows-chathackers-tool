import "./App.css";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getToolState } from "./requests";
import { type State } from "../types";

export default function App() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [toolState, setToolState] = useState<State>();

  async function loadToolState(roomId: string) {
    const toolState = await getToolState(roomId);
    console.log(toolState);
    setToolState(toolState);
  }

  useEffect(() => {
    if (roomId) {
      loadToolState(roomId);
    }
  }, []);

  return (
    <div>
      <h1>Rainbow Tool dashboard</h1>
      {toolState && (
        <div>
          <p>We're making rainbows</p>
        </div>
      )}
    </div>
  );
}
