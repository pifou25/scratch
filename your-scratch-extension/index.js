const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
const TargetType = require('../../extension-support/target-type');
const JsonPath = require('./jsonpath.js');

class Scratch3JeedomExtension {

  // unique ID of any json-rps request
  uniqueId = 0;

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
        color1: '#C3C3C3',
        color2: '#454449',
    
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
                  defaultValue: '{}',
                  type: ArgumentType.STRING
                }
              }
          },
          {
            opcode: 'jsonGetter',
            blockType: BlockType.REPORTER,
            text: 'Get [KEY] from [JSON_OBJ] object',
            blockIconURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH6AIDDxIFXXQMoAAAAAFvck5UAc+id5oAAAu8SURBVHja7Zvbc5THlcB/3f1d5qLRDEIggZAQEpiLASE7weBgx4H1Oib21qa2tvbytHnYh33d/2Wr4rfsPu2ldrN2EkJSNontjUFgHDAIEEgIYQl0wbrNaC7fpXsfvpGQQHeNUHD5VE3pQa2ePr8+ffqc00eCZcjgYK8RQixn6PqJgbr65oovQi414MGDng1XXghBEHjcvnnJPHMAG638zDqkJNQBXTcvVhTCkgD+lERKhdYhtysI4bkCMA0h1GHFjsNzB2A2hEoch+cSQARBonVI1xot4bkFEEGIfELXrdVDeK4BRBAkOly9JTz3AGYgrNIxfiMATEMIV+ETvjEApiGs1DGuDwABlq2wXbXqSFJIge1aKOvxEo0xS36EEIShT9fNjmVBsCqtu1QCqSSjD7KUCgG1DSmkEpgVGKaQgsALGeodJ5lx2VRXhdYhtuMulz9ah9ztvmpadrctugMVBSCkQIeGi7/qovfaMPnJEsfeeYHDbzRTKvjLnsd2FJ+f7abz069IZmLsPbqdIyebSaU3wQpAhmGw5JiKHgHbUVz/5D63zg+gQ0O6NknVphhar8w5G2Oo3pygKhMjKIVcPXePO5cHsR21rGMw/YlsYXGpmAUIKSjlfb7qeoRUgn2vNND2g2aUJfFLS+/EbPFLIfuONdDSVselM910f/GQvs4Rdr9UjxCirFxlpGIWIITA90ICTyOUpGHPZmJJhzDQq5ov9DVVm2LUt2QiKF5IGK5ursWk4k5w2umHoV5UedtRSEsS+prAD+eHEDyeY73KEhsSByhbMnBnlI5f3OZR/yTKVhuxjI0BoGzJ+NAUH/9nJ9c+7uPT/7pBIVtCqo2pPFUUgJAicrzGYBbw/LLsLP1CgOUqinmfwAsXDpjK0wghovn/FAEIKXDjFoVsiWLOR9kSN27N660DL2RLU5q2k81sqqvipTdbSNXE5/cXBtyEjZCC/GQRrxDgxK2KglizE1SWJPA1g/fGuXy2h1LBp3ZHikxd1bxKGQMCw5FTuzj0/WaUim6P+ST0NbWN1VRlYuTGilz85R2OnNpFMu0iVRR0bSgAy1EM901w/v0uCtkSYWBIVDu0/1kLTkzhl+ZXzJjorhcCFrgAIgChJlUT58ipXVw6001/1yMe3h2jenOcE3+1f2HLeVYApBTkJ0uMDeaQlsSyJLZrka5NYJaxrmXFMwbSWxIoW6JDTSnvM+qFeIWgIkdhyRkePrxrpFzYVQghGB3MMXJ/glsXBsiOFWnav5k3/v4gOjDzR20mug0sR+GXAnRg5l2JlIIw0Pz2Z1f5eiBLpi7Bvld2ULujmsyWxJIhttaabdtaFtVxzU7QYNjaVE37my185+1WLFsy1DfB2OAUypr/u5UtGRvM8fnZHqbGS8gFxymG+iYYfZAllrT53o/3c/C1Jmrqq1acX6wbAMrnuZD12NqUJpF28EsBhayHWMBylCW58dlXnH+/i54rUZIznwgJUxNFQl9TXZtgU32SQtZbMHLcGACzRGuDQLDUydLaoLUhlrQJg3DpDFc8/rtKy/pFgkt4l+nAZ6PfHjesJhgGGh2adcnwNhZA2UqlEgtagZSCmvoqnJiipi614HUoBDM5QgVLAHOkgumwiRYrwWhD9usCzosWOtCEvp4Dwy8FHHi1keZDW0lmYvjF4MmpsFyFshS5sWIZGkixstriMwWgtSGedNi8PcX40BRf/v4eg73jvHiikZr6uWGxMVH+kKqJz3sELEfxsGeUm+cHeNQ/CQa2NqWxXIVXWFl16ZkBwESKHTm5i4mRPI8GJhnu6yO1KUZdU/qpkNUYQxjMv53KEtz5/CFdHQMkql0a9tZw4HuNBF7lrr9pWXMk+CQEy1UUcx73rg9TzHm0tm8jmXFXlLgoSzI2OEXvtSHStQl2HtyCZaunjtJSspxIsLIAyiKViIIbIRYNdRcDOR0qG23wvXDB+sJaAVS8JgigQ0Np9lld6VUv5tYD11O+UW+D3wL4FsC3AFYsSzpBN2EjxPPJySyjLLWof757o9f09wxg2fZG67IqCXyfHa0NtBzYtaCei1pAX+cwHWdvEU/GNlqXVUlhqsgrP1x88xYFYNkKN2HjxNclXFh30cbGWuLZbe2aCaKMLwhRVvTgObvEo0ONDjWIqHNEzlPJNcagA40xjztMnh4DRpfneWIOrTUY5v27pWTNAHRoSGYSpDJJcuNT5CYKSBm94XtFn6p0gmQ6jg41uYkCoR/OKWd7RR+pJOnNVViORT5bIDeex3LK/UHT9QUpsGIugRcQBuEcZW3Xjlrq/XDFhYM1A/CKHu1v7OP46SNcOHOVC2ev4sYdQl9z9K3DtH9/H7Fk1NszNVHg5z/9kPHhLJatKBU8duyp5/jbbWxv3QpEtYIbHT1c+PVVAi9A2Qqv6NO8fzun/u442bEpPnjvHL4fIkVUdDn9D6+Rrk3xP//yIZOjOSxr+a/NFT7cZmZX217by/HTbeSzRS7+5hpSSRIpl/xEEWVJvKLPjj31/OU/nUIpybU/3GZ8JEvr4UbaXt/L5u0ZPnjvHFpHbwuWbZGsjpOsjnP4xF4+O3OFeBlsalMVVelEBGSFOVNFAExbnSnXBCxb8uKx3RhjeP+9c/TfGcR2LKSSOG7klS3H4gd/fRSlJGd+9gmd53tQluTyR528+49v0Hq4iYOv7uGL391ECOY8sLx08gC3LveSHc1hORZhsPo6wbpEOILIkRljKE6VsGxFLOnixGwQ4HsB9c211NSlGegZ5vYXfaQyCRKpGEJKPv/wBgD7j7ZiO9acXQ0DjROzOfrW4QUfVTcUgBAQBCE3LvYgpeT0T15je8tWinkP3wtmbo3abRkAHvQOR7tb9ouOazE+Mkk+W6SmLk2iOk6oH0d0vdf7Gbr/iANHW9ixuw6vuPz2u2cCAMCJ2Vz5+BYdZ7+krqmWv/nntzn9k9fZtLUar+CDgHhVdH6LU6W54aiAwA8pTEW+wnYUzCqG5HNFPvvlFQCOv3MEYE1dY+sS4QghsGzF+V9dofd6P9/584O80L6Tphfq+d+ffsRXt4dmih1qnrtbCFBKlZVjTodULOFw58p9+rsHadxTzwvtzZTy3qrXWhkLmGcDhBDEki4jA2N88N7v+Pi/LxFLunz3zUMYrZkcnQIgXTv3XUCHBjfhkEzHKeRKkYXMihuilyTz2Ap+1EYiFVtVyWzlAERU/i7mvajWF+rop36ilU2AV/LxS0HUNO1YdHb0lDtAkzgxm4e9I2itaT7QQCIVwyv6GG3I5wrs3N+A7Vj0dw+Snyw8Ffk5MYeB7mE6O7rJbKkmXZta9U2wIgChr0llErz6oyNs27UFN+5Q11RL66FGAKayRUCgQ83uw01sb9mCkAIh4MVjrQgheHjvEQjB2PAk1z/rJlkd59TfHiOZjmOMYc+RnZz4i3YMhj/+/taC4a3tWFz6zTVKhdWbP6zQBwR+QN3OWo6+dYijbx1CazOzOyMDY/Re74/6eUPDKz88zOZtGYpTJQBiSZfh/lEu/fYathO10f/hF1+QrI6zu62J3W1NFKdKxJIuOtR89O8XeNg7jBt3KOa9GRC2a0WxhqMYG57k8kedvPpOO5ZjreqhdUUA3LhDz5f3+Y+hCZr2bad2ewYdakYGxrh16S7FvIdlK7Q2nP23/6PlYCO1DRkAHvQMc+tyL37Jx3KsskWF/PpfP6Xl4A6aDzTgxm1Ghya588c+RgZGceNOtEhbMfl1jhsdPQzdf4RtRzDchEPn+W4SqThSSbySP2+ytZgsOvqTn18yl8/dIJaY26fvlxMSgZjxf45rzckEAz8k8INZXxT9A8STJh0lTQHG6PJ8Udg7O40V5TK5V/RRlsKJWY+jT20oFT1A4MbtOVZQzJd4+eQBXv/xd1dXEJGWjJ6jkszx9LZjRRHakzJrjGWrJXPxSLlo4YuJKae600nV7FtDSPHUBk1vbeCF0aYspuNivzzx7suicW999CT1nEnoaxr31nPi3ZcXtfL/B1mwYILjjts/AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDI0LTAyLTAzVDE1OjE3OjU3KzAwOjAwI3ThxwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyNC0wMi0wM1QxNToxNzo1NyswMDowMFIpWXsAAAAASUVORK5CYII=',
            arguments: {
              JSON_OBJ: {
                defaultValue: "{}",
                type: ArgumentType.STRING
              },
              KEY: {
                  defaultValue: 'key',
                  type: ArgumentType.STRING
                }
              }
          },
          {
            opcode: 'jsonSetter',
            blockType: BlockType.REPORTER,
            text: 'Set [KEY] to [VALUE] into [JSON_OBJ] object',
            blockIconURI: 'data:image/png;base64,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',
            arguments: {
              JSON_OBJ: {
                defaultValue: "{}",
                type: ArgumentType.STRING
              },
              KEY: {
                  defaultValue: 'key',
                  type: ArgumentType.STRING
                },
              VALUE: {
                  defaultValue: 'value',
                  type: ArgumentType.STRING
                }
              }
          },
          {
            opcode: 'jsonCount',
            blockType: BlockType.REPORTER,
            text: 'Count how many items are in [JSON_OBJ] object',
            blockIconURI: 'data:image/png;base64,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',
            arguments: {
              JSON_OBJ: {
                defaultValue: "{}",
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
    var params = JSON.parse(PARAMS);
    params.apikey = API_KEY;
    var req = {jsonrpc: "2.0", id: this.uniqueId++, method: METHOD, params: params}; // TODO: generate unique ID
    console.debug('Call Jeedom:' + JSON.stringify(req));

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(req),
      redirect: 'follow'
    };

    return fetch(URL + "/core/api/jeeApi.php", requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result); return result;})
      .catch(error => {console.log('error', error); return error;});

  }

  jsonGetter({JSON_OBJ, KEY}) {
    try{
      var obj = JSON.parse(JSON_OBJ);
      if(!isNaN(KEY)){
        // if numeric key: check if obj is an array and has enough items
        index = parseInt(KEY);
        if(!Array.isArray(obj)){
          console.log('numeric key but object is not an array.');
        }else if(index > obj.length){
          console.log(`${index} out of boud array ${obj.length}`);
        }else{
          return JSON.stringify(obj[index]);
        }
      }
      var data = JsonPath.jsonPath(obj, KEY);
      if(Array.isArray(data) && data.length == 1){
        // bug jsonPath when it return a single array of array:
        // get the first item
        data = data[0]; 
      }

      return JSON.stringify(data);

    }catch(error){
      return(`"erreur": "${error}`);
    }
  }

  jsonSetter({JSON_OBJ, KEY, VALUE}) {
    try{
      var data = JSON.parse(JSON_OBJ);
      data[KEY] = VALUE;
      return JSON.stringify(data);
    }catch(error){
      return(`"erreur": "${error}`);
    }
  }

  jsonCount({JSON_OBJ}) {
    try{
      var data = JSON.parse(JSON_OBJ);
      if(Array.isArray(data)){
        return data.length;
      }else{
        console.log(`pas une liste: ${data}`);
      }
    }catch(error){
      return(`"erreur": "${error}`);
    }
  }

}

module.exports = Scratch3JeedomExtension;
