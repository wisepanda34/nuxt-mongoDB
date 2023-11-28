export default defineEventHandler( async () => {
    try {
        const response =  await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=4fd94d0dd42303cf19a84a022c8d636e')
        if(!response.ok){
            throw new Error (`Status: ${ response.status }`)
        }
        const data = await response.json()
        console.log("data:", data)
        return data
    }catch (error) {
        console.log("Error:",error.message)
    }
})