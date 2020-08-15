const yargs = require('yargs')
const request = require('request')
const chalk = require('chalk')

const weatherKey = "af7fdb30e2a55f99cd8a259e49e01513"


const getWeather = (lat,long,callback) => {
    const weatherURL = `https://api.darksky.net/forecast/${weatherKey}/${lat},${long}?units=si`

    request({url:weatherURL,json:true},(error,{body}) => {
        if(error){
            callback('Cannot connect to DarkSky API',undefined)

        }else if(body.error){
            callback('Unable to fetch weather at current location',undefined)

        }else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                currently: body.currently.temperature,
                chanceOfRain: body.currently.precipProbability
            })
        }
        
    })
}
module.exports = getWeather