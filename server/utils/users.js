[{
    id: '',
    name: 'petru',
    room: 'the office fans'
}]


//addUser (id, name, room)
//remove user (id)
// getUser(id)
//getUserList(room)

class Users {
    constructor(){
        this.users= [];

    }

    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        console.log('user added id:', id);
        console.log('*******************************');
        return user;
    }

    removeUser (id) {
        // return user that was removed
        console.log("id to be removed", id);
        var removedUserFromObject = this.users.filter(user => user.id !== id);
        this.users = removedUserFromObject;
        var usersArray  = this.users.map(user => user.name);
        var removedUserArray = removedUserFromObject.map(user => user.name);
        console.log('%%%%%%users', usersArray, usersArray.length, '= users with one removed', removedUserArray, removedUserArray.length);

        if (usersArray.length === removedUserArray.lenght) {
            console.log('NO user removed', usersArray, removedUserArray);
            return false;
        } else {
            console.log('!!!! am scos un user', removedUserArray)
            return removedUserFromObject;
        }
    } 
 
    getUser (id) {

        var oneUserById = this.users.filter ((user) => user.id === id);
        var oneUserByIdArray = oneUserById.map((user) => user.name);
        // console.log("+++a+", oneUserById);
        if (oneUserByIdArray.length === 0) {
            return false;
        } else {
            return oneUserByIdArray;

        }

    }

    getUserList (room) {
        //return array
        var users = this.users.filter((user) => {
            return user.room === room;
        } );
        var namesArray = users.map((user) => 
    {
        return user.name; 
    } );
     return namesArray;
    }

} 

module.exports= {Users};


// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age =age;
//     }
//     getUserDescritption() {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('petru', 38);
// console.log(me.name, me.age); 
// var description = me.getUserDescritption();

// console.log(description);