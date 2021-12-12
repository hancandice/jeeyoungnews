import "@testing-library/jest-dom/extend-expect";
import "@testing-library/react-native";
import Enzime, { EnzymeAdapter } from "enzyme";

Enzime.configure({ adapter: new EnzymeAdapter() });

jest.mock("@react-native-async-storage/async-storage", () => ({
  AsyncStorage: {
    clear: jest.fn().mockName("clear"),
    getAllKeys: jest.fn().mockName("getAllKeys"),
    getItem: jest.fn().mockName("getItem"),
    removeItem: jest.fn().mockName("removeItem"),
    setItem: jest.fn().mockName("setItem"),
  },
}));

jest.mock("react-native-keyboard-aware-scroll-view", () => {
  const KeyboardAwareScrollView = ({
    children,
  }: {
    children: React.ReactNode;
  }) => children;
  return { KeyboardAwareScrollView };
});

jest.mock("react-native-button", () => {
  const React = require("React");
  const RealComponent = jest.requireActual("react-native-button");

  const TextButton = class extends React.Component {
    static Item = (props: { children: never }) =>
      React.createElement("Item", props, props.children);
    static propTypes = RealComponent.propTypes;

    render() {
      return React.createElement("TextButton", this.props, this.props.children);
    }
  };
  return TextButton;
});
