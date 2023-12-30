export default defineEventHandler( async () => {
  try {
    // London
    // const response =  await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=4fd94d0dd42303cf19a84a022c8d636e')
    // Hassocks
    const response =  await fetch('https://api.openweathermap.org/data/2.5/weather?lat=50.9198&lon=-0.151891&appid=4fd94d0dd42303cf19a84a022c8d636e')
    if(!response.ok){
      throw new Error (`Status: ${ response.status }`)
    }
    const data = await response.json()
    // console.log("data:", data)
    return data
  }catch (error) {
    console.log("Error:",error.message)
  }
})