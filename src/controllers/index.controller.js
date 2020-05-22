const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render('index');
};

indexController.renderAbout = (req, res) => {
    res.render('about');
};
indexController.renderPortafolio = (req, res) => {
    res.render('portafolio');
}

module.exports = indexController;