node-red-contrib-secvest
=====================

A node to control your Abus Secvest Alarm System

## Install

Run the following command in your Node-RED user directory - typically `~/.node-red`

        npm install node-red-contrib-secvest

## Information

Set/Unset/Partset your Secvest

## Usage

You can either

- inject any message and specify the command (set/unset/partset) in the Secvest node configuration
- inject a message with the command (set/unset/partset) as msg.payload

You can also:

- connect, e.g. a debug node to get the JSON Reply from the Secvest

## More to come

so make sure you always update to the latest version
