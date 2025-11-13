import { generateRainbow } from "./rainbow";

const rainbow = async () => {
  const rainbow = generateRainbow();

  return {
    message: `Here's a new rainbow!\n${rainbow}\n See you in 24 hours for your next rainbow!`
  };
};

const handleMessage = async (event) => {
  const message = event.content.body.toLowerCase();

  if (message.includes("rainbow")) {
    return rainbow();
  }
};

export default handleMessage;
