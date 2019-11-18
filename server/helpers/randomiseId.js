function generateId () {
    let stringId = ''
    for (let i = 0; i < 10;i++) {
        let idRandom = Math.floor(Math.random()*10)
        stringId += String(idRandom)
    };

    return stringId

}

module.exports = {
    generateId
}
