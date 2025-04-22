import { GradePipe } from "./grade.pipe";

describe('GradePipe', () => {
    it('create an instance', () => {
        const pipe = new GradePipe();
        expect(pipe).toBeTruthy();
    });

    it('should assign A when the mark is at least 90', () => {
        const pipe = new GradePipe();
        let grade = pipe.transform(93);
        expect(grade).toBe('A');
    });

    it('should assign A when the mark is between 80 and 90', () => {
        const pipe = new GradePipe();
        let grade = pipe.transform(85);
        expect(grade).toBe('B');
    });
})