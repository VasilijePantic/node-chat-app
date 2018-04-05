// ES6  CLASSES


class Users {
    constructor () {
        this.users = [];
    }

    // 1st method
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }


    //2nd method
    removeUser(id) {
        var user = this.getUser(id);
        if(user) {
            this.users === this.users.filter((user) => user.id !== id);
        }

        return user;
    }


    //3rd method
    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }


    //4th method
    getUserList (room) {
        var users = this.users.filter((user) => {// filtering users array
            return user.room === room;// return users from specific room
        })
        var namesArray = users.map((user) => {// map returns a value we want to use
            return user.name;// we just need the names for the list
        })

        return namesArray;
    }
}


module.exports = {Users};
