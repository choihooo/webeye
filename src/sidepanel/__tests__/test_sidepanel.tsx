import * as React from "react";
import { Sidepanel } from "../component";
import renderer from "react-test-renderer";

it("component renders", () => {
    const tree = renderer.create(<Sidepanel />).toJSON();
    expect(tree).toMatchSnapshot();
});
