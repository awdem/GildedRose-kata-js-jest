const {Shop, Item} = require("../src/gilded_rose");

describe('Gilded Rose', () => {
  test('when getItems is called, it returns the items array', () => {
    const items = [new Item("item", 0, 0)]
    const gildedRose = new Shop(items);

    shopItems = gildedRose.getItems()
    expect(shopItems[0].name).toBe("item");
  });

  describe('#updateQuality', () => {
    describe('given in-date items', () => {
      test('it lowers the quality of a normal item by 1', () => {
        const items = [new Item("item", 10, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const item = gildedRose.getItems()[0]
        expect(item.quality).toBe(19);    
      });

      test('it lowers the quality of conjured items by 2', () => {
        const items = [
          new Item("Conjured Mana Cake", 10, 20),
          new Item("Conjured Pants", 10, 20),
        ]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const itemOne = gildedRose.getItems()[0]
        const itemTwo = gildedRose.getItems()[1]
        expect(itemOne.quality).toBe(18);    
        expect(itemTwo.quality).toBe(18);    
      });

      test('it does not change the quality of Sulfuras', () => {
        const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const item = gildedRose.getItems()[0]
        expect(item.quality).toBe(80);    
      });

      test('it raises the quality of Aged Brie by 1', () => {
        const items = [new Item("Aged Brie", 10, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const agedBrie = gildedRose.getItems()[0]
        expect(agedBrie.quality).toBe(21);    
      });
      
      test('when SellIn > 10, it raises the quality of Backstage passes by 1 ', () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const backstagePass = gildedRose.getItems()[0]
        expect(backstagePass.quality).toBe(21);    
      });

      test.each([10, 9, 8, 7, 6])(
        'when SellIn is 6..10, it raises the quality of Backstage passes by 2',
        (sellIn) => {
          const items = [new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, 1)]
          const gildedRose = new Shop(items);

          gildedRose.updateQuality()
          const backstagePass = gildedRose.getItems()[0]
          expect(backstagePass.quality).toBe(3);    
        }
      );

      test.each([5, 4, 3, 2, 1, 0])(
        'when SellIn is 0..5, it raises the quality of Backstage passes by 3',
        (sellIn) => {
          const items = [new Item("Backstage passes to a TAFKAL80ETC concert", sellIn, 1)]
          const gildedRose = new Shop(items);

          gildedRose.updateQuality()
          const backstagePass = gildedRose.getItems()[0]
          expect(backstagePass.quality).toBe(4);    
        }
      );

      test('Backstage pass quality cannot go above 50', () => {
        const items = [
          new Item("Backstage passes to a TAFKAL80ETC concert", 15, 50),
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50),
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),
        ]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const updatedItems = gildedRose.getItems()
        const totalQuality = updatedItems.reduce((sum, item) => sum + item.quality, 0)
        expect(totalQuality).toBe(150); 
      });
    })

    describe('given out-of-date items', () => {
      test('it lowers the quality of a normal item by 2, rather than 1', () => {
        const items = [new Item("item", -1, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const item = gildedRose.getItems()[0]
        expect(item.quality).toBe(18);      
      })

      test('it lowers the quality of conjured items by 4', () => {
        const items = [
          new Item("Conjured Mana Cake", -1, 20),
          new Item("Conjured Pants", -1, 20),
        ]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const itemOne = gildedRose.getItems()[0]
        const itemTwo = gildedRose.getItems()[1]
        expect(itemOne.quality).toBe(16);    
        expect(itemTwo.quality).toBe(16);    
      });

      test('it does not change the quality of Sulfuras', () => {
        const items = [new Item("Sulfuras, Hand of Ragnaros", -1, 80)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const item = gildedRose.getItems()[0]
        expect(item.quality).toBe(80);    
      });
      test('it raises the quality of Aged Brie by 1', () => {
        const items = [new Item("Aged Brie", -1, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const agedBrie = gildedRose.getItems()[0]
        expect(agedBrie.quality).toBe(21);    
      });

      test('Aged Brie quality cannot go above 50', () => {
        const items = [new Item("Aged Brie", -1, 50)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const agedBrie = gildedRose.getItems()[0]
        expect(agedBrie.quality).toBe(50);   
      });

      test('it sets the quality of Backstage passes to 0', () => {
        const items = [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const backstagePass = gildedRose.getItems()[0]
        expect(backstagePass.quality).toBe(0);    
      });

      test('of the items that lose quality, no item quality can go below 0', () => {
        const items = [
          new Item("regular item", -1, 0),
          new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
          new Item("Conjured Pants", -1, 0),
        ]
        const gildedRose = new Shop(items);

        gildedRose.updateQuality()
        const updatedItems = gildedRose.getItems()
        const totalQuality = updatedItems.reduce((sum, item) => sum + item.quality, 0)
        expect(totalQuality).toBe(0);
      });
    })
  })

  describe('#updateSellIn', () => {
    it('lowers the sellIn property of all items in the items array by 1', () => {
      const items = [
        new Item("item one", 1, 0),
        new Item("item two", 10, 0),
        new Item("item three", 0, 0),
      ]
      const gildedRose = new Shop(items);

      gildedRose.updateSellIn()
      const itemOne = gildedRose.getItems()[0]
      const itemTwo = gildedRose.getItems()[1]
      const itemThree = gildedRose.getItems()[2]

      expect(itemOne.sellIn).toBe(0)
      expect(itemTwo.sellIn).toBe(9)
      expect(itemThree.sellIn).toBe(-1)
    })
  })
});
