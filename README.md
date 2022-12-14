# node-red-contrib-secvest

A node-red module to control/check the status of your Abus Secvest Alarm System
Compatible with all ABUS Secvest FU5xxxx Systems.

## Install

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install @yreiser/node-red-contrib-secvest

or install via 'Manage palette' in Node-Red.

## Information

- Use the 'Secvest Command' node to set/unset/partset your Secvest. You can either inject a general msg and specify the command and the partition in the node configuration, or you inject a message with the command (set/unset/partset) as msg.payload. You can also set the desired partition (1/2/3 or 4) as msg.payload. The output delivers the JSON response from the Secvest.

- Use the 'Secvest Status" node to check the state of alarm partitions/zones/logs/...

## Note

It takes 7 seconds for the Secvest REST API to respond the first time.

## Version history

- 2.0.12 Added different output msg formats for 'Command' Nodes
- 2.0.5 New feature: select partition via msg.payload on 'Secvest Command' nodes
- 2.0.0 Completely rewritten module. Includes configuration node and status display
