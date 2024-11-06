const {connectUser} = require('../services/sessions')

exports.connectUser = async (req, res) => {
    const user = await connectUser(req.body.username, req.body.password)
    res.json(book)
}