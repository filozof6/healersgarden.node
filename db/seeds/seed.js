var fs = require("fs");
var path = require("path");

const seedMapper = function (dataEntity) {
    const ModelClass = require(`./../models/${dataEntity}.js`);
    const jsonData = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, `json/${dataEntity}.json`))
    );
    jsonData.forEach(element => {
        let modelInstance = new ModelClass(element);
        modelInstance.save();
    });
}

module.exports = seedMapper;