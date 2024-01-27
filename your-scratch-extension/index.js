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
          color2: '#FEFEFE',
      
          // your Scratch blocks
          blocks: [
            {
              // function where your code logic lives
              opcode: 'callJeedomApi',
      
              // type of block
              blockType: BlockType.REPORTER,
      
              // label to display on the block
              text: 'Call Jeedom API [URL] with [API_KEY], [METHOD] and Json encoded [PARAMS]',
      
              blockIconURI: 'data:image/png;base64,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',

              // arguments used in the block
              arguments: {
                METHOD: {
                  // name of API method
                  defaultValue: "ping",
      
                  // type/shape of the parameter
                  type: ArgumentType.STRING
                },
                URL: {
                    // URL of Jeedom (e.g. http://192.168.0.12 or https://my.domaine.com)
                    defaultValue: 'http://192.168.0.12',
                    type: ArgumentType.STRING
                  },
                API_KEY: {
                    // Jeedom API key
                    defaultValue: '',
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
    callJeedomApi ({ METHOD, URL, API_KEY, PARAMS }) {
      if(METHOD === undefined || METHOD == '' || URL == undefined || URL == '' || API_KEY == undefined || API_KEY == '') {
        console.error(`Missing parameters ! method=${METHOD} url=${URL} api_key=${API_KEY}`);
        return 'false';
      }
      console.debug(`Call Jeedom( method=${METHOD} url=${URL} api_key=${API_KEY} params=${PARAMS})`);
      var params = JSON.parse(PARAMS);
      params.apikey = API_KEY;
      var req = {jsonrpc: "2.0", id: "007", method: METHOD, params: params}; // TODO: generate unique ID
      console.debug('Call Jeedom:' + JSON.stringify(req));

        return fetch(`${URL}/core/api/jeeApi.php`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
          })
          .then((response) => {
            console.debug(response);
            if (response.ok) {
              return response.json();
            }
            else {
              return 'unknow error';
            }
          });
      }
}

module.exports = Scratch3JeedomExtension;
