module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
        this.servername = n.servername;
        this.user = n.user;
        this.password = n.password;
    }
    RED.nodes.registerType("ABUS Secvest",RemoteServerNode);
}