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

async function otherDisneyData(){
    try{
        const response = await fetch('https://queue-times.com/parks.json');

        if(response.ok){
            const allData = await response.json();
            const [ disneyData ] = await allData.filter((data) => data.id === 2);
            const disneyParks = disneyData.parks;
            return disneyParks;
        }
        
    } catch (error){
        console.error(error);
    }
}


app.get('/api/parks', async (req, res) => {
    
    const disney = await otherDisneyData();
    res.send(disney);
});

app.get('/api/parks/plan', async (req, res) =>{
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