const helper = () => {
    var d = new Date();
    var v = new Date();
    v.setMinutes(d.getMinutes() + 30);
    return v
}


module.exports = {
    helper
}