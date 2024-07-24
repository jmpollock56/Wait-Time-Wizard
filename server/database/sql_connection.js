import mysql from 'mysql2'
import dotenv from 'dotenv'

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'wtw'
}).promise()

export async function getAchievements(){
  const [achievements] = await pool.query('SELECT * FROM achievements');
  const [achievement_parks] = await pool.query('SELECT * FROM achievement_parks');

  for (let i = 0; i < achievements.length; i++) {
    achievements[i].parks = [];

    for (let j = 0; j < achievement_parks.length; j++) {
      if (achievements[i].id === achievement_parks[j].achievement_id) {
        const [parks] = await pool.query('SELECT * FROM parks WHERE id = ?', [achievement_parks[j].park_id]);

        if (parks.length > 0) {
          achievements[i].parks.push(parks[0]);
        }
      }
    }
  }

  return achievements;
  
}

export async function verifyUser(username, password){
  const [users] = await pool.query('SELECT * FROM users')

  for(let i = 0; i < users.length; i++){
    
    if(username === users[i].email && password === users[i].password){
      return {isUser: true, id: users[i].id}
    } else {
      return {isUser: false}
    }
  }
}

async function setupUserTrips(trips){
  const formattedTripParks = await Promise.all(trips.map(async (trip) => {
    const [tripParks] = await pool.query('SELECT trip_parks.trip_day, parks.name FROM wtw.trip_parks INNER JOIN wtw.parks ON trip_parks.park_id = parks.id WHERE trip_parks.trip_id = ?', [trip.id])
    trip.parkDays = tripParks
    return trip
  }))
  

  return formattedTripParks
}

export async function getUser(id){
  const [user] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  const [userTrips] = await pool.query('SELECT * FROM trips WHERE user_id = ?', [id])
  const completeTrips = await setupUserTrips(userTrips)
 
  const completeUser = {
    id: user[0].id,
    username: user[0].username,
    trips: completeTrips
  }

  return completeUser
}

export async function removeTrip(tripId){
  const [res] = await pool.query('DELETE FROM trips WHERE id = ?',[tripId])
  if(res.affectedRows > 0){
    return true
  } else {
    return false
  }
}

export async function insertTrip(trip) {
  const {trip_id, resort, start_date, end_date, tripDays, user_id} = trip
  const [resTrip] = await pool.query('INSERT INTO wtw.trips (id, resort, start_date, end_date, user_id) VALUES (?,?,?,?,?)',
    [trip_id, resort, start_date, end_date, user_id]
  )
  
  
  for(let i = 0; i < tripDays.length; i++){
    const {id, name} = tripDays[i]
    await pool.query('INSERT INTO trip_parks VALUES (?,?,?)',[trip_id, id, i])
  }

  if(resTrip.affectedRows > 0){
    return true
  } else {
    return false
  }
}



