node-red-contrib-secvest
=====================

A node-red module to control/check the status of your Abus Secvest Alarm System

## Install

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-secvest

## Information

- Use the 'Secvest Command' node to set/unset/partset your Secvest. You can either inject a general msg and specify the command in the node configuration, or you inject a message with the command (set/unset/partset) as msg.payload. The output delivers the JSON response from the Secvest.

- Use the 'Secvest Status" node to check the state of alarm partitions/zones/logs/...

## Note

It takes 7 seconds for the Secvest REST API to respond.
