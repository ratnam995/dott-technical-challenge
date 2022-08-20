import Dogs from '../shared/services/apis/dogs.api';

const fullList = [ 'test item 1', 'test item 2', 'test item 3', 'test item 4', 'test item 5'];

describe("Dogs", () => {
    describe("getAll", () => {
        it("should all the dogs", () => {
            return Dogs.getAll('golden', 'retriever')
            .then(data => {
                expect(data).toBeDefined()
            })
        });
    })
    describe("getSome", () => {
        it("should return paginated dogs", () => {
            return Dogs.getSome({
                page: 1, limit: 2
            }, fullList)
            .then(data => {
                expect(data).toEqual(['test item 3', 'test item 4'])
            })
        });
        it("should return empty array when all the data is fetched", () => {
            return Dogs.getSome({
                page: 5, limit: 2
            }, fullList)
            .then(data => {
                expect(data).toEqual([])
            })
        });
    })
});
