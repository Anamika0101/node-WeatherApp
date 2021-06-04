const request=require('request')

const foreCast=(lat,long,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+long+'&appid=6cda6cd84dc6f76a1c769a046825e1ed&units=metric'
    request({url, json:true}, (error, {body }={})=>{
        if(error){ 
            callback("Unable to connect to weather services!", undefined)
        }
        else if(body.message){
            callback("Unable to find location.Try other location.", undefined)
        }
        else{
            callback(undefined,(body.daily[0].weather[0].description).toUpperCase()+". It is currently "+ (body.current.temp ) +" degrees out. There is a "+body.daily[0].pop+"% chance of rain.")
        }
    })
}

module.exports = foreCast


// // Get required details using openweathermap
// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=6cda6cd84dc6f76a1c769a046825e1ed&units=metric'

// request({ url:url, json:true }, (error, response)=>{
//     if(error){
//         console.log("Unable to connect to weather service!")
//     }
//     else if(response.body.message){
//         console.log("Unable to find location")
//     }
//     else{
//         console.log(response.body.daily[0].weather[0].description + ". It is currently "+ (response.body.current.temp ) +" degrees out there!")
//     }
// })
