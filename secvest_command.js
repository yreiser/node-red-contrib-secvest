const axios = require("axios");
const https = require("https");

module.exports = function (RED) {
  function statusNode(config) {
    const node = this;
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server);
    const host = this.server.host;
    const port = this.server.port;
    const user = this.server.user;
    const password = this.server.password;
    const part = config.partition;
    const command = config.command;
    const outformat = config.outformat;
    var partition = part;

    node.on("input", function (msg) {
      if (part == "topic") {
        partition = msg.topic;
      }

      inputMsgCommand = msg.payload;

      const base_url = "https://" + host + ":" + port;

      var jsonCommand;
      if (command == "payload") {
        jsonCommand = { state: inputMsgCommand };
      } else {
        if (command == "unset" || command == "partset" || command == "set") {
          jsonCommand = { state: command };
        }
      }

      const url = base_url + "/system/partitions-" + partition + "/";

      node.status({
        fill: "blue",
        shape: "ring",
        text: "Connecting (wait ~7s)",
      });

      axios
        .put(url, jsonCommand, {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: user,
            password: password,
          },
        })
        .then(function (response) {
          if (outformat == "full") {
            finalmsg = response.data;
          } else if (outformat == "state") {
            finalmsg = response.data.state;
          }
          msg.payload = finalmsg;
          node.send(msg);
          node.status({
            fill: "green",
            shape: "dot",
            text: "Partition " + finalmsg.id + " : " + finalmsg.state,
          });
        })
        .catch(function (error) {
          node.status({ fill: "red", shape: "dot", text: "Error" });
        });
    });
  }

  RED.nodes.registerType("Secvest Command", statusNode);
};
