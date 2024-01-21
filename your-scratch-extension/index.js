const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');

class Scratch3JeedomExtension {

    constructor (runtime) {
        this.runtime = runtime;
        // put any setup for your extension here
    }

    /**
     * Returns the metadata about your extension.
     */
    getInfo () {
        return {
          // unique ID for your extension
          id: 'jeedom',
      
          // name displayed in the Scratch UI
          name: 'jeedom',
      
          // colours to use for your extension blocks
          color1: '#454449',
          color2: '#94CA02',
      
          // your Scratch blocks
          blocks: [
            {
              // function where your code logic lives
              opcode: 'callJeedomApi',
      
              // type of block
              blockType: BlockType.REPORTER,
      
              // label to display on the block
              text: 'Call Jeedom API [METHOD, PARAMS]',
      
              // arguments used in the block
              arguments: {
                METHOD: {
                  // name of API method
                  defaultValue: "ping",
      
                  // type/shape of the parameter
                  type: ArgumentType.STRING
                },
                PARAMS: {
                    // json list of parameters
                    defaultValue: '{"apikey": "abc123", "datetime": "0"}',
        
                    // type/shape of the parameter
                    type: ArgumentType.STRING
                  }
                }
            }
          ]
        };
    }


    /**
     * implementation of the block with the opcode that matches this name
     *  this will be called when the block is used
     * implementation of Jeedom Json RPC API
     * https://doc.jeedom.com/fr_FR/core/4.4/jsonrpc_api
     */
    callJeedomApi ({ METHOD, PARAMS }) {
        return fetch('https://192.168.1.25/core/api/jeeApi.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(PARAMS)
          })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            else {
              return { title: 'Unknown' };
            }
          })
          .then((bookinfo) => {
            return bookinfo.title;
          });
      }
}

module.exports = Scratch3JeedomExtension;
