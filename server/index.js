import express from 'express';
import cors from 'cors';
import { disneyResorts } from './parkIds.js';

const port = 5000;
const app = express();

app.use(cors());

async function getDisneyData() {
    const parkData = [];
    const promises = parkIds.map(async (park) => {
        try {
            const response = await fetch(`https://api.themeparks.wiki/v1/entity/${park}/live`);
            const data = await response.json();
            parkData.push(data);
        } catch (error) {
            console.error(error);
        }
    });

    await Promise.all(promises);
    return parkData;
}

async function addDisneyData(id) {
    try {
        const response = await fetch(`https://queue-times.com/parks/${id}/queue_times.json`);

        if (response.ok) {
            const rideData = await response.json();
            return rideData;
        }
    } catch (error) {
        console.log(error);
    }
}

async function otherDisneyData() {
    try {
        const response = await fetch('https://queue-times.com/parks.json');

        if (response.ok) {
            const allData = await response.json();
            const [disneyData] = await allData.filter((data) => data.id === 2);
            const disneyParks = disneyData.parks;

            const parkDataPromises = disneyParks.map(async (park) => {
                return await addDisneyData(park.id);
            })
            const fullParkData = await Promise.all(parkDataPromises);
            return fullParkData;
        }

    } catch (error) {
        console.error(error);
    }
}


async function testParkData(id) {
    try {
        const response = await fetch(`https://api.themeparks.wiki/v1/entity/${id}/live`);
        const data = await response.json();
        const liveData = data.liveData;
        const filteredLiveData = liveData.filter((data) => data.entityType === "ATTRACTION");
        return filteredLiveData;
    } catch (error) {
        console.error(error);
    }
}

async function parseTest() {
    let full = [];
    const parks = disneyResorts[0].parks;

    const promises = parks.map( async (park) => {
        const livePark = await testParkData(park.id);

        park.liveRides = livePark;
        full.push(park);
        
    });

    await Promise.all(promises);
    return full;
}

parseTest();

app.get('/api/parks', async (req, res) => {

    const disney = await parseTest();
    res.send(disney);
});

app.get('/api/parks/plan', async (req, res) => {
    res.send(disneyResorts);
});

app.get('/api/rides/:parkId', async (req, res) => {
    const { parkId } = req.params;

    const rides = await getRideData(parkId);
    res.send(rides);
})

app.listen(port, async () => {
    console.log('Server is listenting on', port);
});