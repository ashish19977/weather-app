const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getWeatherData = require('./utilities/forecast.js')
const getCordinates=require('./utilities/geocode.js')

const app = express()

const port=process.env.PORT||5050

hbs.registerPartials(path.join(__dirname,'../templates/partials'))

const staticpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
var cond=""
//console.log(staticpath)

//app.use is to customize the app
app.use(express.static(staticpath))

//app.set('veiw engine', 'hbs')
app.set('views',viewpath)

app.get("", (req, res) => {
    res.render('index.hbs',{'condition':cond})
})

app.get("/help", (req, res) => {
    res.render('help.hbs')
})

app.get("/about", (req, res) => {
    res.render('about.hbs')
})

app.get("/weather", (req, res) => {
    if (!req.query.search)
        //for emptry query
        return res.render('error.hbs')
    else
    {
        getCordinates(req.query.search, (error, result) => {
            if (error) {
                //when error is given by geocoding service
                return res.send({data:{error:error}})
            }
            else {
                getWeatherData(result, (error, data,placename) => {
                    if (error) // if error thrown by weatherservice
                        return res.send({data:{error:error}})
                    else
                        res.send({ data: { weatherdata: data ,placename:placename} })
                })
            }
        })
  }  
})

app.get("*", (req, res) => {
    res.render('error.hbs')
})


app.listen(port, () => {
    console.log("server is up on "+port)
})