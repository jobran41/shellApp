const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nameMachine: { type: String, unique: true, required: true },
    os: { type: String, required: true },
    cpu: { type: String, required: true },
    ram: { type: String, required: true },
    disque: { type: String, required: true },
    adressIp: { type: String, required: true },
    netMask: { type: String },
    getWay: { type: String },
    dns: { type: String },
    exsiDestination: { type: String },
    datasourceDestination: { type: String },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('File', schema);