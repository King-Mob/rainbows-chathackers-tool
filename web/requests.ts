const { origin, pathname } = window.location;
const BASE_URL = `${origin}${pathname}`;

export async function getToolState(roomId: string) {
    const toolStateResponse = await fetch(`${BASE_URL}/api/state?roomId=${roomId}`);
    const toolStateResult = await toolStateResponse.json();

    return toolStateResult;
}