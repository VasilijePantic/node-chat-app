var expect = require('expect');
var {isRealString} = require('./validation');



describe('isRealString', () => {

    //1st test case
    it('should reject non-string values', () => {
        var num = 13;
        var invalidInput = isRealString(num);

        expect(invalidInput).toBe(false);
    });

    //2nd test case
    it('should reject strings with only spaces', () => {
        var emptyString = '      ';
        var invalidInput = isRealString(emptyString);

        expect(invalidInput).toBe(false);
    });



    //3rd test case
    it('should allow strings with non-space characters', () => {
        var wierdString = '  $@#!  ';
        var validInput = isRealString(wierdString);

        expect(validInput).toBe(true);
    });
});