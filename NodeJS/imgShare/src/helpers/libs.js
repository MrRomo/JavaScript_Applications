const helpers = {}

helpers.randomName = () => {
    const posible = 'qwertyuiopasdfghjklzxcvbnm1234567890'
    let randomChar = 0
    for (let i = 0; i<9; i++) {
        randomChar += posible.charAt(Math.floor(Math.random()*posible.length))
    }
    return randomChar
}

module.exports = helpers