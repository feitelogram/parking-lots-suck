// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from 'axios'
const ENDPOINT = "https://api.yelp.com/v3/businesses/search"
const API_KEY = process.env.API_KEY

const queryApi = async (location) => {
  const LOCATION_ADDED = `${ENDPOINT}?location=${location}&term=parking`
 try {
  const { data } = await axios(LOCATION_ADDED, {
    headers: {
      "Authorization": "Bearer " + API_KEY
    }
  })
  return data.businesses
 } catch (error) {
   console.error(error)
 }
}

export default async (req, res) => {
  if(req.query.location){
    const businesses = await queryApi(req.query.location)
    res.json(businesses)
  } 
}
