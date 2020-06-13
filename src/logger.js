var date = new Date();

function log(string) {
    console.log(date.toLocaleDateString() + " " + date.toLocaleTimeString() + '   ' + string);
}
exports.log = log;