const expect = require('expect');

const {Users} = require('./users.js');

describe('Users', () => {

    var users;

    beforeEach(() => {

    users = new Users();
    users.users = [
        {
        id: 1,
        name: 'Mike',
        room: 'Node Course'

    },
    {
        id: 2,
        name: 'Jen',
        room: 'React Course'

    },

    {
        id: 3,
        name: 'Julie',
        room: 'Node Course'
    }

];

    });


it('should add new user', () => {
    var users = new Users();
    var user = {
        id: 123,
        name: 'Petru',
        room: 'The Office Fans'
    };

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
});

it('should remove a user by id', () => {

    var user2Removed = users.removeUser(2);
    expect(user2Removed).toEqual(['Mike','Julie'])
});

it('should not remove user, crazy ID', () => {
    var user2Removed = users.removeUser(15);
    expect(user2Removed).toBeFalsy;
});

it('should find user by id', () => {
    var userName = users.getUser(2);
    expect(userName).toEqual(['Jen']);

});

it('should not find user by crazy id', () => {

    var userName = users.getUser(15);
    expect(userName).toBeFalsy;
 
});

it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);

});

it('should return names for react course', () => {
    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
    
});

});