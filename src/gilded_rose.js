class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  updateSellIn() {
    this.items.forEach((item) => {
      item.sellIn -= 1;
    });
  }

  updateQuality() {
    this.items.forEach((item) => {
      if (item.quality === 0) {
        return;
      }

      switch (item.name) {
        case "Aged Brie":
          if (item.quality < 50) {
            item.quality += 1;
          }
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          if (item.sellIn > 10) {
            item.quality += 1;
          } else if (item.sellIn >= 6 && item.sellIn <= 10) {
            item.quality += 2;
          } else if (item.sellIn >= 0 && item.sellIn <= 5) {
            item.quality += 3;
          } else if (item.sellIn < 0) {
            item.quality = 0;
          }

          if (item.quality > 50) {
            item.quality = 50;
          }
          
          break;
        default:
          item.sellIn < 0 ? item.quality -= 2 : item.quality -= 1;
      }
    })
  }
}

module.exports = {
  Item,
  Shop
}
