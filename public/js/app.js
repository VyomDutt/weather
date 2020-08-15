// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const place = 'Ghaziabad'

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMessage = document.querySelector('#firstMessage')
const secondMessage = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    
    firstMessage.textContent = 'Loading...'
    secondMessage.textContent = ''

    const url = `http://localhost:3000/weather?address=${location}`

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                firstMessage.textContent = data.error
            }else{
                firstMessage.textContent = data.location
                secondMessage.textContent = data.currently
            }
            
        })
    })
})