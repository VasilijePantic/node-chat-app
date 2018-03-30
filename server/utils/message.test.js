var expect = require('expect');
var {generateMessage} = require('./message');// importing function for testing



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