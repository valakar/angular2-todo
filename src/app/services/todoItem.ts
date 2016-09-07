export class TodoItem {
    constructor(public id:number,
                public isDone:boolean,
                public text:string,
                public description:string,
                public time:number) {
    }
}