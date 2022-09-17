const { default: axios } = require('axios');

module.exports = function(RED) {
    function statusNode(config) {
        const node = this;
        RED.nodes.createNode(this,config);
        this.server = RED.nodes.getNode(config.server);
        const host = this.server.host;
        const port = this.server.port;
        const user = this.server.user;
        const password = this.server.password;
        const partition = config.partition;
        const command = config.command;

        node.on('input', function(msg) {
            var url = '';
            const base_url  = 'https://' + host + ':' + port;
            if (command == 'partitions'){
                url=base_url + '/system/partitions/';
            }
            else if (command == 'details'){
                url=base_url + '/system/partitions-'+partition+'/';
            }
            else if (command == 'zones'){
                url=base_url + '/system/partitions-'+partition+'/zones/';
            }
            else if (command == 'output'){
                url=base_url + '/output/';
            }
            else if (command == 'faults'){
                url=base_url + '/faults/';
            }
            else if (command == 'logs'){
                url=base_url + '/logs/';
            }
            else if (command == 'state'){
                url=base_url + '/system/partitions-'+partition+'/';
            }
            const axios=require('axios');
            const https=require('https');
            node.status({fill:"blue",shape:"ring",text:"Connecting (wait 7s)"});

            axios.get(url, {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false}
                ),
                auth: {
                    username: user,
                    password: password
                }
            })
            .then(function (response) {
                finalmsg = response.data;
                node.status({fill:"green",shape:"dot",text:"OK"});
                if (command == 'state'){
                    finalmsg = finalmsg.state;
                    node.status({fill:"green",shape:"dot",text:"Partition "+partition+" : "+finalmsg});
                }
                msg.payload=finalmsg;
                node.send(msg);
                
                
            })
            .catch(function (error) {
                node.status({fill:"red",shape:"dot",text:"Error"});
            });
        });
    }
  
    RED.nodes.registerType("Secvest Status",statusNode);
} 

