const mongoose = require("mongoose");
const MUUID = require("uuid-mongodb");

const Schema = mongoose.Schema;

const revanSchema = new Schema({
  _id: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v1(),
    auto: true
  },
  privateKey: {
    type: String,
    required: true
  },
  // publicKey: {
  //   type: String,
  //   required: true
  // },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("revancoin", revanSchema);
