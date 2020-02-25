
//    fetch('http://localhost:5050/weather?search=ambala').then((res) => {
//     res.json().then(result=>{
//   console.log(result)
//     })
//    })

let minidatadetails=['Summary','Temp','Humidity','Wind Speed','UV']
document.getElementById('search-formm').addEventListener('submit', () => {
    event.preventDefault()
    document.getElementById("mini-data-div2").style.display = "none"
    document.getElementById('placename').style.display = "flex"
    document.getElementById('placename').innerHTML='Fetching Weather Data ...'
    let search = document.getElementById('search').value
    fetch('http://localhost:5050/weather?search=' + search).then((res)=> {
        res.json().then(result => {
            if (result.data.error)
            {
                document.getElementById('placename').innerHTML = result.data.error
                document.getElementById("mini-data-div2").style.display="none"
                
            }
            else {
                console.log(result.data)
                document.getElementById('placename').innerHTML = result.data.placename
                document.getElementById("mini-data-div2").style.display = "flex"
                
                let { summary,apparentTemperature, humidity, windSpeed, uvIndex } = result.data.weatherdata.currently
                let minidata = [summary,Math.abs(apparentTemperature), humidity, windSpeed, uvIndex]
                let minidataelements=document.getElementsByClassName("mini-data-span")
                Object.keys(minidataelements).map((key) => {
                   minidataelements[key].innerHTML=minidatadetails[parseInt(key)]+" : "+minidata[parseInt(key)]
               })
            }
        })
    })
})