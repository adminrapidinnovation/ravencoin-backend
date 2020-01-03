const Raven = require("../module/raven");
const ravencore = require("ravencore-lib");
const RpcClient = require('ravend-rpc');

var config = {
  protocol: 'http',
  user: 'ravencoin',
  pass: 'local321',
  host: '127.0.0.1',
  port: '8766',
};
// var config = {
//   protocol: 'http',
//   user: 'ravencoin',
//   pass: 'local321',
//   host: 'ravenrpc.zero2pi.com',
//   port: '80',
// };
var rpc = new RpcClient(config);

function generateblock() {
  rpc.generate(4, (err, res) => {
    if (err) console.log("err-->", err);
    else
      console.log("block-->", res);
  })
}

Raven.getaddress = async (request, response) => {
  rpc.getNewAddress((err, res1) => {
    if (err) response.status(400).send(err)
    else {
      rpc.dumpPrivKey(res1.result, (err, res2) => {
        if (err) response.status(400).send(err)
        else {
          let raven = new Raven();
          raven.privateKey = res2.result;
          raven.address = res1.result;
          response.status(200).send({
            PrivateKey: res2.result,
            Address: res1.result
          });
        }
      })
    }
  })
};

Raven.getbalance = async (req, res) => {
  rpc.getAddressUtxos({ addresses: [req.body.address], assetName: req.body.assetName }, (error, response) => {
    if (error) {
      console.log("something went wrong ", error);
    } else {
      console.log("response ", response);
      if (response.result.length) {
        const balance = response.result.reduce(function (previous, current) {
          return previous + current.satoshis;
        }, 0);
        console.log("balance ", balance)
        res.status(200).send(`satoshis: ${balance}`);
      }
    }
  });
}

// Raven.getaccount = async (req, res) => {
//   rpc.getAssetData((err, response) => {
//     if (err) console.log('err--', err);
//     else
//       console.log('acc--->', response);
//     res.status(200).send(`Account: ${response.result}`);
//   });
// }


//  Raven.getaddress = async (request, res) => {
//    const privatekey = new ravencore.PrivateKey('testnet');
//    var publicKey = ravencore.PublicKey(privatekey);
//    let raven = new Raven();
//    raven.privateKey = privatekey.toString();
//   raven.publicKey = publicKey.toString();
//   raven.address = privatekey.toAddress();
//   res.status(200).send({
//     PrivateKey: raven.privateKey,
//     PublicKey: raven.publicKey,
//     Address: raven.address mksgbdcpY8Pdha9Cx53BfQFrKXUj2CyLst
//   });
// };

Raven.issueAssets = (request, response) => {
  rpc.issue(request.body.Assets_name, request.body.qty, request.body.toAddress, request.body.changeAddress, request.body.units, request.body.reissuable, request.body.has_ipfs, request.body.ipfs_hash, (err, res) => {
    if (err) response.status(400).send(err)
    else {
      response.status(200).send(res)
    }
    //generateblock();
  })
};

Raven.transferAssets = (request, response) => {
  generateblock();
  rpc.transfer(request.body.Assets_name, request.body.qty, request.body.to_address, (err, res) => {
    if (err) response.status(400).send(err)
    else response.status(200).send(res);
  })
};

Raven.dummy = (request, response) => {
  rpc.importAddress('mycpHsBQpJ4GCm32mqd8PCNwSK1LKRde5f', 'label', true, (err, res) => {
    if (err) response.status(400).send(err)
    else response.status(200).send(res)
  })
}

module.exports = Raven;
