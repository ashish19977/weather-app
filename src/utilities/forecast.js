const request=require('request')
const getWeatherData = (data, callback) => {
    let weatherurl = "https://api.darksky.net/forecast/22f2602b3a19701b7ff70448ed4707f0/" + data.longitude + "," + data.latitude+"?units=ca"
    request.get({ url: weatherurl, json: true }, (error, Response) => {
        if (error)
            callback("Unable To Connect To Weather Service!", undefined,undefined)
        else if (Response.body.error)
            callback("Please Provide Another Nearest Address", undefined,undefined)
        else {
            callback(undefined, Response.body,data.placename)
        }
    })
}

module.exports=getWeatherData