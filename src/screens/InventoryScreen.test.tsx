import { render } from "@testing-library/react-native";
import React from "react";
import prepareReduxWrapper from "../utils/prepareReduxWrapper";
import PostModalScreen from "./PostModalScreen";

describe("<ClippedScreen />", () => {
  it("renders without crashing", () => {
    const [Wrapper, store] = prepareReduxWrapper();
    const rendered = render(
      <Wrapper>
        <PostModalScreen />
      </Wrapper>
    ).toJSON();
    expect(rendered).toBeTruthy();
  });
});
