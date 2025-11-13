import "./App.css";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { getRainbows, postRainbow } from "./requests";

export default function App() {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [rainbows, setRainbows] = useState<string[]>([]);

  async function loadRainbows(roomId: string) {
    const rainbows = await getRainbows(roomId);
    console.log(rainbows);
    setRainbows(
      rainbows.map((rainbow: { rainbow: string }) => rainbow.rainbow)
    );
  }

  async function sendRainbow() {
    if (roomId) {
      await postRainbow(roomId);
      loadRainbows(roomId);
    }
  }

  useEffect(() => {
    if (roomId) {
      loadRainbows(roomId);
    }
  }, []);

  return (
    <div>
      <h1>Rainbow Tool dashboard</h1>
      <button onClick={sendRainbow}>Send new rainbow</button>
      <h2>Past rainbows</h2>
      {rainbows.map((rainbow) => (
        <p>{rainbow}</p>
      ))}
    </div>
  );
}
