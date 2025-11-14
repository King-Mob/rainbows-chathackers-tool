import { ToadScheduler, SimpleIntervalJob, Task } from 'toad-scheduler';
import { getRainbowsAll, insertRainbow } from './duckdb';
import { generateRainbow } from "./rainbow";
import { sendMessage } from "./requests";

async function checkRainbows() {
    const rainbows = await getRainbowsAll();
    const rooms = [];
    const roomsWithRecentRainbows = [];

    rainbows.forEach(rainbow => {
        if (!rooms.includes(rainbow.room_id))
            rooms.push(rainbow.room_id);

        const timestampNow = Date.now();
        const sent = (new Date(rainbow.sent as number)).getTime();
        const mSecondsSince = timestampNow - sent;
        const msDay = 24 * 60 * 60 * 1000;

        if (mSecondsSince < msDay) {
            if (!roomsWithRecentRainbows.includes(rainbow.room_id))
                roomsWithRecentRainbows.push(rainbow.room_id);
        }
    });

    const roomsWithoutRainbows = rooms.filter(room => !roomsWithRecentRainbows.includes(room));

    roomsWithoutRainbows.forEach(room => {
        const newRainbow = generateRainbow()
        sendMessage(room, `Here's a new rainbow!\n${newRainbow}\n See you in 24 hours for your next rainbow!`)
        insertRainbow(room, newRainbow);
    })
}

const beginSchedule = () => {
    const scheduler = new ToadScheduler();

    const task = new Task('simple task', () => {
        console.log('Checking rainbows');

        checkRainbows()
    });

    const job = new SimpleIntervalJob(
        { minutes: 5, runImmediately: true },
        task,
        { id: 'rainbow_age_check' }
    );

    //create and start jobs
    scheduler.addSimpleIntervalJob(job);
}

export default beginSchedule;