const request= require('request')

const geoCode=(address, callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5hbWlrYTAxIiwiYSI6ImNrcGN5MHM0MTFoNXoyem9nc3ZlY2h0dmIifQ.pvydw0P1wXNRoAWvgEYeAg&limit=1'

    request({url, json:true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location.Try another search.',undefined)
        }
        else
        {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports= geoCode


// // Geocoding using mapbox
// // Address -> Lat/Long -> Weather
// const geoCodeURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/Satna.json?access_token=pk.eyJ1IjoiYW5hbWlrYTAxIiwiYSI6ImNrcGN5MHM0MTFoNXoyem9nc3ZlY2h0dmIifQ.pvydw0P1wXNRoAWvgEYeAg&limit=1'

// request({ url:geoCodeURL, json:true},(error, response)=>{
//     if(error){
//         console.log("Unable to connect to location services!")
//     }
//     else if(response.body.features.length===0){
//         console.log("Cannot find location")
//     }
//     else{
//         const long=response.body.features[0].center[0]
//         const lat=response.body.features[0].center[1]
//         console.log("Longitude=" +long +"\nLatitude=" + lat)
//     }
// })
