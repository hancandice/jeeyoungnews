import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import PictureSelector from "../components/PictureSelector";
import prepareReduxWrapper from "../utils/prepareReduxWrapper";
import PostModalScreen from "./PostModalScreen";

describe("<PostModalScreen />", () => {
  const setup = () => {
    const [Wrapper, store] = prepareReduxWrapper();
    const rendered = render(
      <Wrapper>
        <PostModalScreen />
      </Wrapper>
    );
    const { getByText, getByPlaceholderText, getByTestId } = rendered;
    const nameInput = getByPlaceholderText("Bracelet");
    const categoryInput = getByPlaceholderText("Select a category...");
    const valueInput = getByPlaceholderText("700");
    const descriptionInput = getByPlaceholderText("Optional");
    const addButton = getByTestId("addButton");
    const cancelButton = getByTestId("cancelButton");

    return {
      store,
      rendered,
      nameInput,
      categoryInput,
      valueInput,
      descriptionInput,
      addButton,
      cancelButton,
    };
  };

  const pictureSelectorSetup = () => {
    const [Wrapper, store] = prepareReduxWrapper();
    const props = {
      setStartCamera: jest.fn(),
      setPictureURL: jest.fn(),
      pictureURL: null,
    };
    const pictureSelectorRendered = render(
      <Wrapper>
        <PictureSelector {...props} />
      </Wrapper>
    );
    const { getByText, getByPlaceholderText, getByTestId } =
      pictureSelectorRendered;

    const pictureButton = getByTestId("pictureButton");

    return {
      store,
      pictureSelectorRendered,
      pictureButton,
    };
  };

  it("renders properly", () => {
    setup();
  });

  it("has four inputs and two buttons", async () => {
    const {
      nameInput,
      categoryInput,
      valueInput,
      descriptionInput,
      addButton,
      cancelButton,
    } = setup();
    expect(nameInput).toBeTruthy();
    expect(categoryInput).toBeTruthy();
    expect(valueInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(addButton).toBeTruthy();
    expect(cancelButton).toBeTruthy();
  });

  it("should simulate onPost", async () => {
    const {
      nameInput,
      categoryInput,
      valueInput,
      rendered,
      addButton,
      descriptionInput,
    } = setup();

    // Add item name
    act(() => {
      fireEvent.changeText(nameInput, "Chanel coco handle bag");
    });

    // Add item category
    const modalSelector = await rendered.findByTestId("modalSelector");
    act(() => {
      fireEvent(modalSelector, "onChange", { key: 0, label: "Art" });
    });

    // Add item value
    act(() => {
      fireEvent.changeText(valueInput, "4000");
    });

    expect(nameInput.props.value).toEqual("Chanel coco handle bag");
    expect(categoryInput.props.value).toEqual("Art");
    expect(valueInput.props.value).toEqual("4000");
    expect(addButton.props.disabled).toBe(true);

    // Add item description(optional)
    act(() => {
      fireEvent.changeText(descriptionInput, "Optional");
    });
    expect(addButton.props.disabled).toBe(true);

    // Add item photo
    // 1. Render PictureSelector
    const { pictureButton } = pictureSelectorSetup();
    expect(pictureButton).toBeTruthy();
    // act(() => {
    //   fireEvent.press(pictureButton);
    // });
  });
});
