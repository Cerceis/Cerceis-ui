export interface Notification{
    id: string, //Unique id
    title: string, //Label
    datetime: string,
    life: number, //Life until notification dissapear, -1 to stay forever or until user close it.
    text: string, //
    pop: boolean, //Specifiy to pop-up automatically or not
}