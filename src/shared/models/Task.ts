export class Task {
    constructor(
        public name: string,
        public description: string,
        public user: string,
        public date: string,
        public priority: string,
        public status: string,
        public id?: string) {
    }
}