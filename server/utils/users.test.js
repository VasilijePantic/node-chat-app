const expect = require('expect');
const {Users} = require('./users');

// describe block for Users class
describe('Users', () => {

    // beforeEach
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: 2,
            name: 'Jen',
            room: 'React Course'
        }, {
            id: 3,
            name: 'Julie',
            room: 'Node Course'
        }]
    });




    // 1st test case - for - addUser  
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The Office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });



    //2nd test case - for - getUserList
    it('should return names for "Node Course" room', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });
    //3rd test case - for - getUserList
    it('should return names for "React Course" room', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });



    //4th test case - for - removeUser
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId); //TypeError: Cannot read property 'id' of undefined
        expect(users.users.length).toBe(2);
    });

    // 5th test case - for - removeUser
    it('should not remove user', () => {
        var userId = '99';
        var users = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });



    // 6th test case - for - getUser
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);// TypeError: Cannot read property 'id' of undefined
    });
    
    // 7th test case - for - getUser
    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

});