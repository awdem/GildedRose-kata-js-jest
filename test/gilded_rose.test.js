const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  test("when getItems is called, it returns the items array", () => {
    const items = [new Item("item", 0, 0)]
    const gildedRose = new Shop(items);

    shopItems =gildedRose.getItems()
    expect(shopItems[0].name).toBe("item");
  });
});
