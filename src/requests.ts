const { secret, wrapper_url } = process.env;

export async function sendMessage(roomId, message) {
    return fetch(`${wrapper_url}/api/send?roomId=${roomId}&toolId=rainbow&secret=${secret}`, {
        method: "POST",
        body: JSON.stringify({
            message
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}