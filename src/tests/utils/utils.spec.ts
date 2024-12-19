import { pluck, range } from "./utils"

describe('utils', () => { // section of tests
    describe('range', () => {
        it('returns a range of numbers from 1 to 5', () => { // one test
            expect(range(1, 5)).toEqual([1, 2, 3, 4]); // a visszatérési értéknek number[]-nek kell lenni
        });
        it('returns a range of numbers from 41 to 44', () => { // one test
            expect(range(41, 44)).toEqual([41, 42, 43]);
        });
    });
    describe('pluck', () => {
        it('returns all data ids as an array', () => {
            const data = [
                { id: 1, name: 'foo' },
                { id: 2, name: 'boo' },
                { id: 3, name: 'loo' },
            ]
            expect(pluck(data, 'id')).toEqual([1, 2, 3]);
        });
    })
})