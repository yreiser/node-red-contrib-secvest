module.exports = function (RED) {
    const fs = require('fs');
    const path = require("path");
    const file = path.join(__dirname, "command.json");
    const text = fs.readFileSync(file);
    const flow = JSON.parse(text);
    RED.nodes.registerSubflow(flow);
}
