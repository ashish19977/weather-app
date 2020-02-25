const request=require('request')
const getCordinates = (placename, callback) => {
    console.log(placename)
    let geolocationurl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(placename)+".json?access_token=pk.eyJ1IjoiYXNoaXNoMTk5NyIsImEiOiJjazZuZTE3OWcwanJ1M2VseWl3ajM1NmR1In0.qVNeMhBuugUhvnNpbvw39w"
    request.get({ url: geolocationurl, json: true }, (error, Response) => {
        if (error)
            callback('Unable To Connect To Geolocation Service!', undefined)
        
            else if (Response.body.features.length === 0) 
            callback('Please Provide Another Nearest Address', undefined)
        else
            callback(undefined, {
                "longitude": Response.body.features[0].geometry.coordinates[0], "latitude": Response.body.features[0].geometry.coordinates[1]
            ,"placename":Response.body.features[0].place_name})
    })
}

module.exports=getCordinates