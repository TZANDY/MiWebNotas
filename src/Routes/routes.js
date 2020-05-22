const {
    Router
} = require("express");
const router = Router();

const {
    renderIndex,
    renderAbout,
    renderPortafolio
} = require("../controllers/index.controller");

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get('/portafolio', renderPortafolio);

module.exports = router;