
import {v4 as uuidv4 } from 'uuid'

export  const Mutation={
    addClassroom: (parent, {addClassroomInput}, {db}, info) => {
        const newClassroom={id:uuidv4(),...addClassroomInput}
        db.classroom.push(newClassroom);
        pubsub.publish("todo", { todo: { todo: newTodo, mutation: "ADD" } });
        return newClassroom;
    },
    addTodo:(parent, {addTodoInput}, {db,pubsub}, info)=>{
        const user=db.users.some((user)=>user["id"]===addTodoInput.userId);
        if(!user){
            throw  new Error(` user ${addTodoInput.userId} inexistant`);
        }
        const newTodo={id:uuidv4(),status: "WAITING",...addTodoInput}
        db.classroom.push(newTodo);
        return newTodo;
    },
    updateTodo: (parent, {id,updateTodoInput}, {db,pubsub}, info) => {
        const todo = db.todos.find((todo) => todo.id === id);
        if(!TestIdUser((db.users, "id", addTodoInput.user))){
            throw new Error(" l'userId  n'existe pas")

        }
        if(! todo) {
            throw new Error(" l'id de todo n'existe pas")
        }
        else {
            for ( let i in updateTodoInput) {
                todo[i] = updateTodoInput[i];
            }
        }
        pubsub.publish("todo", { todo: { todo, mutation: "UPDATE" } });
        return todo

    },

    deleteTodo: (parent, { id }, { db,pubsub}, info) => {
        const todo = db.todos.find((todo) => todo.id === id);
        if(! todo) {
            throw new Error(" l'id de todo n'existe pas")
        } else {
            const [todo] = db.todos.splice(todo, 1);
            pubsub.publish("todo", { todo: { todo, mutation: "DELETE" } });
            return todo;
        }
    },
}
function TestIdUser(array, attribut, value) {
    console.log(array, attribut, value);
    return array.some((element) => element[attribut] === value);

}