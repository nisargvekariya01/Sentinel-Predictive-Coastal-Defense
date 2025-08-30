const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const managerSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

managerSchemaSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Manager", managerSchema);
