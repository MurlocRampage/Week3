var events = require('events');
var eventEmitter = new events.EventEmitter();

//result of event
var message = function(){
    console.log("You fired off an event!");

}

//event listener
function emitEvent()
{
    eventEmitter.on("evnt", message);
}

module.exports.nodeevents = function()
{
eventEmitter.emit('evnt');
}

eventEmitter.emit('evnt');