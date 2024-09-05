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

export async function getUserAchievements(id){
  const [userAchievements] = await pool.query('SELECT achievement_id FROM user_achievements WHERE user_id = ?',[id])

  
  return userAchievements

}

export async function verifyUser(username, password){
  const [users] = await pool.query('SELECT * FROM users')

  for(let i = 0; i < users.length; i++){
    if(username === users[i].email && password === users[i].password){
      return {isUser: true, id: users[i].id}
    } 
  }
  return {isUser: false}
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
  const {trip_id, resort, dates, tripDays, user_id} = trip
  const [resTrip] = await pool.query('INSERT INTO wtw.trips (id, resort, start_date, end_date, user_id) VALUES (?,?,?,?,?)',
    [trip_id, resort, dates.start, dates.end, user_id]
  )
  
  
  for(let i = 0; i < tripDays.length; i++){
    const {id} = tripDays[i]
    await pool.query('INSERT INTO trip_parks VALUES (?,?,?)',[trip_id, id, i])
  }

  if(resTrip.affectedRows > 0){
    return true
  } else {
    return false
  }
}

export async function editTrip(trip){
  const { id, resort, dates, tripDays } = trip
  try {
    const [res] = await pool.query('UPDATE trips SET resort = ?, start_date = ?, end_date = ? WHERE id = ?',[resort, dates.start, dates.end, id])

    if(tripDays.length > 0){
      for(let i = 0; i < tripDays.length; i++){
        const day = tripDays[i]
        console.log(day.id)
        await pool.query('UPDATE trip_parks SET park_id = ? WHERE trip_id = ? AND trip_day = ?',[day.id, id, i])
      }
    }
   
    
  } catch (error) {
    console.log(error)
  }
  
}

export async function getTrip(id){
  console.log(id)
}

export async function createUser(newUser){
  const { id, username, email, password } = newUser

  const [similarRes] = await pool.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username])

  if(similarRes.length === 0) {
    const [res] = await pool.query('INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)', [id, username, email, password])

    if(res.affectedRows === 1){
      return { message: 'User successfully created', wasCreated: true } 
    } else {
      return { message: 'There was an issue with account creation', wasCreated: false }
    }
  } else {

    for(let i = 0; i < similarRes.length; i++){
      if(similarRes[i].email === email){
        return { message: 'There is already an email associated with another account', wasCreated: false }
      } else if(similarRes[i].username === username){
        return { message: 'There is already a username associated with another account', wasCreated: false }
      }
    }
    
  }
  
}



