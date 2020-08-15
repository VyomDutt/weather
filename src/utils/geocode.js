const request = require('request')
const chalk = require('chalk')

const mapKey = "pk.eyJ1IjoidnlvbWRpcnQiLCJhIjoiY2tkdXB0NGE0MmEwczJxdGFkb2tqZTR6MiJ9.Aost1XOcZotnUDpALmX6nw"

const geocode = (address,callback) => {

    address = encodeURIComponent(address)
    const mapURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapKey}&limit=1`

    request({url: mapURL,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)

        }else if(body.features.length === 0){
            callback('Unable to get co-ordinates',undefined)

        }else{
            const features = body.features[0]
            callback(undefined,{
                long: features.center[0],
                lat: features.center[1],
                place: features.place_name
            })
        }
    })

}

module.exports = geocode