const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#firstMessage')
const secondMessage = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    firstMessage.textContent = 'Loading...'
    secondMessage.textContent = ''
    
    const url = `/weather?address=${location}`

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                firstMessage.textContent = data.error
            }else{
                firstMessage.textContent = data.location
                secondMessage.textContent = `It is ${data.currently} degrees outside. ${data.forecast} There's a ${data.chanceOfRain*100} chance of rain.`
            }
            
        })
    })
})