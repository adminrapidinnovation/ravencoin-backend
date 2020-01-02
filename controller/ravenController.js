const Raven = require("../module/raven");
const ravencore = require("ravencore-lib");
const RpcClient = require('ravend-rpc');

Raven.getaddress = async (req, res) => {
  const privatekey = new ravencore.PrivateKey();
  var publicKey = ravencore.PublicKey(privatekey);
  let raven = new Raven();
  raven.privateKey = privatekey.toString();
  raven.publicKey = publicKey.toString();
  raven.address = privatekey.toAddress();
  res.status(200).send({
    PrivateKey: raven.privateKey,
    PublicKey: raven.publicKey,
    Address: raven.address
  });
};

var config = {
  protocol: 'http',
  user: 'ravencoin',
  pass: 'local321',
  host: '127.0.0.1',
  port: '8766',
};
var rpc = new RpcClient(config);

Raven.issueAssets = (req, resp) => {
  rpc.issue(req.body.Assets_name, req.body.qty, req.body.toAddress, req.body.changeAddress, req.body.units, req.body.reissuable, req.body.has_ipfs, req.body.ipfs_hash, (err, res) => {
    if (err) resp.status(400).send(err)
    else {
      resp.status(200).send(res)
    }
  })
};

Raven.transferAssets = (req, resp) => {
  rpc.transfer(req.body.Assets_name, req.body.qty, req.body.to_address, (err, res) => {
    if (err) resp.status(400).send(err)
    else resp.status(200).send(res)

  })
};

module.exports = Raven;
