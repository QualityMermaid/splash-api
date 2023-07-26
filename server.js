const express = require("express")
const cors = require("cors")
const axios = require("axios")


require("dotenv").config()
const app = express()
app.use(cors())
const PORT = process.env.PORT || 8090

app.get("/", (request, response)=>{
    response.status(200).json("Server running")
})

// get endpoint for photos

app.get("/photos", async (request, response)=>{
    // subject is the 'name' of the thing we are looking at, if it was ?name=${title} then it would be request.query.name
    const subject = request.query.subject
    const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=${subject}`
    // res is the response we get from the API NOT the function
    const res = await axios.get(API)
    // will get all data results
    // console.log(res.data)
    // will get only first index of the result objects
    // console.log(res.data.results[0])
    // console.log(res.data.results[0].urls)
    // this is how to get the prop 
    // console.log(res.data.results[0].urls.thumb)
    // response.status(200).json("Hello")
    // map through the results
    const photos = res.data.results.map((photo)=>{
        return{
            id:photo.id,
            img_url: photo.urls.regular,
            original_image: photo.links.self,
            photographer: photo.user.name
        }
    })
    response.status(200).json(photos)

})

app.listen(PORT, ()=> console.log(`app is running on port ${PORT}`))


// https://api.unsplash.com/search/photos/?client_id=YOUR_ACCESS_KEY
