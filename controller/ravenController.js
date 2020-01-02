const { exec } = require("child_process");
const Raven = require("../module/raven");
const ravencore = require("ravencore-lib");
Raven.getaddress = async (req, res) => {
  const privatekey = new ravencore.PrivateKey();
  var publicKey = ravencore.PublicKey(privatekey);
  let raven = new Raven();
  raven.privateKey = privatekey.toString();
  raven.publicKey = publicKey.toString();
  raven.address = privatekey.toAddress();
  res.status(200).send({
    PrivateKey: raven.privateKey,
    PublicKey: publicKey,
    Address: raven.address
  });
};
// Raven.issueAssets = async (req, res) => {
//   exec(
//     `raven-cli issue ${req.body.Asset_name} ${qty} ${to_address} ${change_address} ${units} true`,
//     (err, resp) => {
//       if (resp) {
//         console.log(resp);
//         res.send(resp);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// };
module.exports = Raven;
