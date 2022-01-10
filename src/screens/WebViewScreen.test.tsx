import { render } from "@testing-library/react-native";
import React from "react";
import { RootStackScreenProps } from "../../types";
import prepareReduxWrapper from "../utils/prepareReduxWrapper";
import WebViewScreen from "./WebViewScreen";

describe("<WebViewScreen />", () => {
  it("renders without crashing", () => {
    const [Wrapper, store] = prepareReduxWrapper();
    // const props: RootStackScreenProps<"WebView"> = {
    //   navigation: jest.fn(),
    //   route: jest.fn(),
    // };

    // const rendered = render(
    //   <Wrapper>
    //     <WebViewScreen {...props} />
    //   </Wrapper>
    // ).toJSON();

    // expect(rendered).toBeTruthy();
  });
});
