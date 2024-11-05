const raspberrys = [
]

exports.addRaspberry = (name) => {
    books.push({
        id: raspberrys.length + 1,
        name
    })
}

exports.getRaspberrys = () => {
    return raspberrys;
}

exports.getRaspberryById = (id) => {
    return raspberrys.find(rasberry => rasberry.id === parseInt(id))
}

exports.deleteRaspberryById = (id) => {
    raspberrys.splice(raspberrys.findIndex(rasberry => rasberry.id === parseInt(id)), 1)
}