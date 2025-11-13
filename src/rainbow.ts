const reds = [
    "🔴", "🍒", "🌶️", "🏮", "📍", "🎈", "💯"
];

const oranges = [
    "🟠", "🧡", "📙", "🎃", "🍊", "🏀", "🥕"
]

const yellows = [
    "🟡", "🌻", "🐤", "🧈", "🚕", "🌞", "😎"
]

const greens = [
    "🟢", "🍏", "🥬", "✅", "🌳", "🐸", "🔋"
]

const blues = [
    "🔵", "🐟", "🐬", "🐳", "🐋", "🧵", "💧"
]

const purples = [
    "🟣", "👾", "☂️", "🍆", "🔮", "💜", "⚛️"
]

export function generateRainbow() {
    const red = reds[Math.floor(Math.random() * reds.length)];
    const orange = oranges[Math.floor(Math.random() * oranges.length)];
    const yellow = yellows[Math.floor(Math.random() * yellows.length)];
    const green = greens[Math.floor(Math.random() * greens.length)];
    const blue = blues[Math.floor(Math.random() * blues.length)];
    const purple = purples[Math.floor(Math.random() * purples.length)];

    return (
        `${red.repeat(7)}
${orange.repeat(7)}
${yellow.repeat(7)}
${green.repeat(7)}
${blue.repeat(7)}
${purple.repeat(7)}`);
}