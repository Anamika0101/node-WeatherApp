const path=require('path')
const express= require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geoCode')
const foreCast=require('./utils/foreCast')

const app = express()
const port= process.env.PORT || 3000

// Define path for Express config
const publicDir=path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDir))
 
// handlebar setup : for dynamic webpages
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Anamika Tiwari'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Anamika Tiwari'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:"How can I help you? ",
        title: 'Help',
        name:'Anamika Tiwari'
    })
})

// app.com/weather
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide an address"
        })
    }
    
    geoCode(req.query.address, (error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send({
                error:error
            })
        }

        foreCast(latitude, longitude,(error,foreCastData)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                forecast:foreCastData,
                location:location,
                address:req.query.address
            })
        })
    })
})


app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:'404',
         errorMessage: 'Help article not found.'
     })
})


app.get('*',(req,res)=>{
     res.render('404',{
         title:'404',
         errorMessage: 'Page not found!'
     })
})


// start the server
app.listen(port, ()=>{
    console.log('Server up on port '+port)
})