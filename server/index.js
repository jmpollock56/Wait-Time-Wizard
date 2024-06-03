import express from 'express';
import cors from 'cors';
import { parkIds } from './parkIds.js';

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


app.get('/api/parks', async (req, res) => {
    console.log('/api/parks called');
    const disney = await getDisneyData();
    res.send(disney);
});

app.get('/api/rides/:parkId', async (req, res) => {
    const { parkId } = req.params;

    const rides = await getRideData(parkId);
    res.send(rides);
})

app.listen(port, async () => {
    console.log('Server is listenting on', port);
});