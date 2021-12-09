import { act, renderHook } from "@testing-library/react-hooks";
import { inventoryActions } from "../modules/inventory/reducer";
import dummyData from "../utils/DummyData";
import prepareReduxWrapper from "../utils/prepareReduxWrapper";
import { usePostModal } from "./usePostModal";

describe("usePostModal", () => {
  const setup = () => {
    const [wrapper, store] = prepareReduxWrapper();
    const { result } = renderHook(() => usePostModal(), { wrapper });
    return { store, result };
  };

  it("properly shows accAmount", () => {
    const { result } = setup();

    expect(result.current[0]).toBe(0);
  });

  it("addItemSuccess", () => {
    const { result, store } = setup();

    store.dispatch(
      inventoryActions.addItemSuccess([dummyData.inventoryData[0]])
    );
    expect(result.current[0]).toBe(
      parseInt(dummyData.inventoryData[0].purchasePrice)
    );

    act(() => {
      result.current[1].addItemSuccess(dummyData.inventoryData.slice(0, 4));
    });
    expect(result.current[0]).toBe(
      parseInt(dummyData.inventoryData[0].purchasePrice) +
        parseInt(dummyData.inventoryData[1].purchasePrice) +
        parseInt(dummyData.inventoryData[2].purchasePrice) +
        parseInt(dummyData.inventoryData[3].purchasePrice)
    );
  });
});
