import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

    getTodoItems():TodoItem[] {
        return [
            new TodoItem(1, false, 'Item 1', 'Description', 10),
            new TodoItem(2, true, 'Item 2', 'Description 2', 20),
            new TodoItem(3, false, 'Item 3', 'Description 3', 30)
        ];
    }

}

export class TodoItem {
    constructor(
        public id:number,
        public isDone:boolean,
        public text:string,
        public description:string,
        public time:number
    ) {}
}
