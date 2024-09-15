import express from 'express';
import cors from 'cors';
import { disneyResorts } from './parkIds.js';
import { achievements } from './achievements.js';
import { getAchievements, getUserAchievements, verifyUser, createUser, getUser, removeTrip, insertTrip, getTrip, editTrip } from './database/sql_connection.js';

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json())

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

async function otherDisneyData() { // Not being used at the moment
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

async function testParkData(park) {
    let wantedRides = park.rides;

    try {
        const response = await fetch(`https://api.themeparks.wiki/v1/entity/${park.id}/live`);
        const data = await response.json();
        const liveData = data.liveData;
        if(park.rides){
            const filteredLiveData = liveData.filter((ride) => wantedRides.includes(ride.id));
            return filteredLiveData;
        } else {
            const attractionLiveData = liveData.filter((ride) => ride.entityType === "ATTRACTION");
            return attractionLiveData;
        }
        
    } catch (error) {
        console.error(error);
    }
}

async function parseTest(resort) {
    const parks = resort.parks;
    let newParks = [];
    const promises = parks.map( async (park) => {
        const livePark = await testParkData(park);
        newParks.push({
            id: park.id,
            name: park.name,
            liveRides: livePark
        });
    });
    await Promise.all(promises);
    return {
        id: resort.id,
        name: resort.name,
        parks: newParks
    }
    
}

app.get('/api/parks', async (req, res) => {
    let allResorts = [];
    for(let i = 0; i < disneyResorts.length; i++){
        let newResort = await parseTest(disneyResorts[i]);
        allResorts.push(newResort);
    } 
    res.send(allResorts);
});

app.get('/api/parks/plan', (req, res) => {
    res.send(disneyResorts);
});

app.get('/api/rides/:parkId', async (req, res) => {
    const { parkId } = req.params;

    const rides = await getRideData(parkId);
    res.send(rides);
})

app.get('/api/collection/achievements', async (req, res) => {
    res.send(achievements);
})

app.get('/api/user/achievements/:userId', async (req, res) => {
    const { userId } = req.params
    const currentUserAchievements = await getUserAchievements(userId)
    console.log(currentUserAchievements)
    res.send(currentUserAchievements)
})

app.post('/api/user/achievements/add', async (req, res) => {
    const newAchievement = req.body
})

app.get('/api/users/:userId', async (req, res) => {
    const { userId } = req.params
    const currentUser = await getUser(userId)
    res.send(currentUser)
})

app.post('/api/user/create', async (req, res) => {
    const newUser = req.body
    

    const userCreatedMessage = await createUser(newUser)
    const { message, wasCreated } = userCreatedMessage

    if(wasCreated){
        res.status(201).send({ message: message })
    } else {
        res.status(401).send({ message: message })
    }

})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    
    const isVerified = await verifyUser(email, password) 
    
    if(isVerified.isUser){
        const user = await getUser(isVerified.id)
      
        res.status(201).json({message: 'Login success', user: user})
    } else {
        res.status(401).json({message: "Invalid email or password"})
    }
})

app.delete('/api/trip/delete/:tripId', async (req, res) => {
    const { tripId } = req.params
    removeTrip(tripId)
})

app.post('/api/trips/add', async (req, res) => {
    const {trip} = req.body
    console.log(trip)
    const response = await insertTrip(trip)

    if(response){
        res.status(200).send({message: 'Trip added'})
    } else {
        res.status(400).send({message: 'Trip added FAILED'})
    }
    
})

app.patch('/api/trip/edit', async (req, res) => {
    const {trip} = req.body
    
    const isEdited = await editTrip(trip)
    
})

app.listen(port, async () => {
    console.log('Server is listenting on', port);
})