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
      const name = item.name

      switch (true) {
        case /aged brie/i.test(name):
          item.quality += 1;
          break;
        case /sulfuras/i.test(name):
          return;
        case /backstage passes/i.test(name):
          this.updateBackstagePassesQuality(item);
          break;
        case /conjured/i.test(name):
          this.updateConjuredItemQuality(item);
          break;
        default:
          item.sellIn >= 0 ? item.quality -= 1 : item.quality -= 2;
      }

      item.quality = Math.min(Math.max(item.quality, 0), 50);
    })
  }

  updateBackstagePassesQuality(pass) {
    if (pass.sellIn > 10) {
      pass.quality += 1;
    } else if (pass.sellIn >= 6 && pass.sellIn <= 10) {
      pass.quality += 2;
    } else if (pass.sellIn >= 0 && pass.sellIn <= 5) {
      pass.quality += 3;
    } else if (pass.sellIn < 0) {
      pass.quality = 0;
    }
  }

  updateConjuredItemQuality(conjuredItem) {
    if (conjuredItem.sellIn >= 0) {
      conjuredItem.quality -= 2;
    } else {
      conjuredItem.quality -= 4;
    }
  }
}

module.exports = {
  Item,
  Shop
}
