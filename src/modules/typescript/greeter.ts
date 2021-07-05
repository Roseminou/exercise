function greeter(person: string) {
    return "Hello, " + person;
}

let user = "Jane User";
// let user = [0,1,2];

document.body.innerHTML = greeter(user);


interface Person {
    firstName: string,
    laseName: string
}
function fullname(perseon) {
    return "My fullname is:" + person.firstName + person.lastName
}
let person = {firstName: "Jane", lastName: "Janmas"}
document.body.innerHTML = fullname(person)