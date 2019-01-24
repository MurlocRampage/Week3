var mongooose = require('mongoose');
var Schema = mongooose.Schema;

var EntrySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.Now
    }
});

mongooose.model('Entries', EntrySchema);