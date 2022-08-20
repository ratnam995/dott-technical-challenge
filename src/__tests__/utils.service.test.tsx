import { isAllImagesFetched } from '../shared/services/utils.service';

const allItemsFetched = {
    config : {
        page: 2,
        limit: 10
    },
    fullList: [
        "some item",
        "some item",
        "some item",
        "some item",
        "some item",
        "some item"
    ]
}

const someItemsFetched = {
    config : {
        page: 1,
        limit: 5
    },
    fullList: [
        "some item",
        "some item",
        "some item",
        "some item",
        "some item",
        "some item",
        "some item",
    ]
}

describe("isAllImagesFetched", () => {
    it("should return false, if there are images left to fetch", () => {
        expect(isAllImagesFetched(someItemsFetched.config, someItemsFetched.fullList)).toBeFalsy();
    });
    it("should return true, if all the images are fetched", () => {
        expect(isAllImagesFetched(allItemsFetched.config, allItemsFetched.fullList)).toBeTruthy();
    });
});
