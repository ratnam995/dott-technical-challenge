import renderer from 'react-test-renderer';
import ClassifierPage from '../pages/ClassifierPage/Classifier.page';

import { BrowserRouter } from 'react-router-dom';

describe("Classifier page", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<BrowserRouter><ClassifierPage/></BrowserRouter>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});