const {
    Router
} = require('express');
const router = Router();


router.get('/', (req, res) => res.json({
    menssage: 'hello world'
}));

module.exports = router;