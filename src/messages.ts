import { insertRainbow } from "./duckdb";
import { generateRainbow } from "./rainbow";

const rainbow = async (roomId) => {
  const rainbow = generateRainbow();

  insertRainbow(roomId, rainbow);

  return {
    message: `Here's a new rainbow!\n${rainbow}\n See you in 24 hours for your next rainbow!`
  };
};

const handleMessage = async (event) => {
  const message = event.content.body.toLowerCase();
  const roomId = event.room_id;

  if (message.includes("rainbow")) {
    return rainbow(roomId);
  }
};

export default handleMessage;
