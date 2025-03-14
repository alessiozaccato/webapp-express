
//funzione custom per inserire dinamicamente le imagini
function setImagePath(req, res, next) {
    req.imagePath = `${req.protocol}://${req.get('host')}/imgs/movies_cover/`;
    next();
}

export default setImagePath;