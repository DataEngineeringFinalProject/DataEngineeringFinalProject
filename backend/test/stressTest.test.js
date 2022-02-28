const loadtest = require('loadtest');
const sentence = "I love you";
const options = {
	url: 'http://localhost:3000',
    concurrency : 10,
	maxRequests: 100,
    method: 'POST',
	body: {sent :JSON.stringify(sentence)},

};
function statusCallback(error, result, latency) {
    console.log('----');
    console.log('Request elapsed milliseconds: ', result.requestElapsed);
    console.log('Request index: ', result.requestIndex);
    console.log('Request loadtest() instance index: ', result.instanceIndex);
}
describe('POST 100 sentences', () => {
    it('stress test : should post 100 sentences with 10 client', done => {
        
            loadtest.loadTest(options, function(error, result)
            {
                if (error)
                {
                    return console.error('Got an error: %s', error);
                }
                console.log('Tests run successfully');
            });
            done();
        
    });
});




