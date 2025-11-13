const { origin, pathname } = window.location;
const BASE_URL = `${origin}${pathname}`;

export async function getRainbows(roomId: string) {
    const rainbowsResponse = await fetch(`${BASE_URL}/api/rainbows?roomId=${roomId}`);
    const rainbowsResult = await rainbowsResponse.json();

    return rainbowsResult;
}

export async function postRainbow(roomId: string) {
    const rainbowsResponse = await fetch(`${BASE_URL}/api/rainbow?roomId=${roomId}`, {
        method: "POST",
        body: JSON.stringify({})
    });
    const rainbowsResult = await rainbowsResponse.json();

    return rainbowsResult;
}