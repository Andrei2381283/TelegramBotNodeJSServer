module.exports = function(){
    var str = "";
    for(var i = 0; i < 6; i++){
        str += Math.floor(Math.random() * 10);
    }
    return str;
}