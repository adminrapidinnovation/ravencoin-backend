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
var rpc = new RpcClient(config);

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
// Raven.getaddress = async (request, res) => {
//   const privatekey = new ravencore.PrivateKey('testnet');
//   var publicKey = ravencore.PublicKey(privatekey);
//   let raven = new Raven();
//   raven.privateKey = privatekey.toString();
//   raven.publicKey = publicKey.toString();
//   raven.address = privatekey.toAddress();
//   res.status(200).send({
//     PrivateKey: raven.privateKey,
//     PublicKey: raven.publicKey,
//     Address: raven.address
//   });
// };

Raven.issueAssets = (request, response) => {
  rpc.issue(request.body.Assets_name, request.body.qty, request.body.toAddress, request.body.changeAddress, request.body.units, request.body.reissuable, request.body.has_ipfs, request.body.ipfs_hash, (err, res) => {
    if (err) response.status(400).send(err)
    else {
      response.status(200).send(res)
    }
  })
};

Raven.transferAssets = (request, response) => {
  rpc.transfer(request.body.Assets_name, request.body.qty, request.body.to_address, (err, res) => {
    if (err) response.status(400).send(err)
    else response.status(200).send(res)

  })
};

Raven.dummy = (request, response) => {
  rpc.importAddress('mycpHsBQpJ4GCm32mqd8PCNwSK1LKRde5f', 'label', true, (err, res) => {
    if (err) response.status(400).send(err)
    else response.status(200).send(res)
  })
}

module.exports = Raven;
