import renderer from 'react-test-renderer';
import HomePage from '../pages/HomePage/Home.page';

import { BrowserRouter } from 'react-router-dom';

describe("Home page", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<BrowserRouter><HomePage/></BrowserRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});