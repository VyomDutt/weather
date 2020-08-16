const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const port = process.env.PORT || 3000

const app = express()
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title: "Weather",
        name: "Vyom Dutt Sharma"
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: "About page",
        name: "Vyom Dutt Sharma",
        age: 22
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: "Help page",
        name: "Vyom Dutt Sharma",
        helpText: "This is some help text"
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please enter address"
        })
    }

    const address = req.query.address

    geocode(address,(error,{lat,long,place} = {} )=>{

        if(error){
            return res.send({
                error
            })
        }
    
        weather(lat,long,(error,{summary,currently,chanceOfRain})=>{
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: summary,
                location: place,
                chanceOfRain,
                currently

            })
        })
    })


})


app.get('/help/*',(req,res)=>{
    res.render('errors',{
        title: 'Help Article not found',
        errorMessage: "Redirect to help",
        name: "Vyom Dutt Sharma"
    })
})
app.get('*',(req,res) => {
    res.render('errors',{
        title: '404',
        errorMessage: "Page not found",
        name: "Vyom Dutt Sharma"
    })
})

app.listen(port,() => {
    console.log("Server is up on port "+port)
})


