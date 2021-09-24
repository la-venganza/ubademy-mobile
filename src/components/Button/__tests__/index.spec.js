// __tests__
import * as React from "react";
import Button from "..";
import renderer from "react-test-renderer";
it(`renders correctly`, () => {
  const tree = renderer.create(<Button>Login</Button>);
  expect(tree).toMatchSnapshot();
});