const PubNub = require('pubnub');


const credentials = {
    publishKey: 'pub-c-e5a77a04-e2c3-4981-92d9-66d73c1473c0',
    subscribeKey:'sub-c-61156e06-0725-11ec-ad72-221653618fb7',
    secretKey: 'sec-c-MjE5Yzk2M2ItNzFmMC00YTdmLTgzMjItMTI1ZTA2ZmJjMTY0'
};

const CHANNELS = {
    TEST: 'TEST'
};

class Pubsubb {
    constructor() {
        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({
            channels: Object.values(CHANNELS)
        });

        this.pubnub.addListener(this.listener()); 
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;
                
                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
            }
        };
    }

    publish({channel, message}) {
        this.pubnub.publish({channel, message});
    }
}

const testPubsubb = new Pubsubb();

testPubsubb.publish({channel:CHANNELS.TEST, message: 'Hello pubnub'});

module.exports = Pubsubb;