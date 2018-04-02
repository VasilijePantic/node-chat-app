var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');// importing function for testing



// describe block for - generateMessage func in server/utils/message.js
describe('generateMessage' , () => {

    // 1st test case
    it('should generate the correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from , text);

        expect(typeof message.createdAt).toBe('number');// instead of toBeA();
        expect(message).toMatchObject({from, text});// toInclude();
    });
});


//describe block for generateLocationMessage
describe('generateLocationMessage', () => {
    //1st test case
    it('should generate correct location obj', () => {
        var from = 'Jen';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from ,latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});