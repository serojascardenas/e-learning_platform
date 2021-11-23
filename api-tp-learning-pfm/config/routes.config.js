const express = require('express')
const router = express.Router()

// Routers
router.get('/', (req, res, next) => {
    res.json({'e-learning portal': 'alive'})
})

module.exports = router