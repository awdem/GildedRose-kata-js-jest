/* eslint-disable require-jsdoc */

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  updateSellIn() {
    this.items.forEach((item) => {
      if (/sulfuras/i.test(item.name)) return;

      item.sellIn -= 1;
    });
  }

  updateQuality() {
    this.items.forEach((item) => {
      const name = item.name;

      switch (true) {
        case /aged brie/i.test(name):
          this.updateAgedBrieQuality(item);
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
          this.updateNormalItemQuality(item);
      }

      this.limitItemQuality(item);
    });
  }

  updateBackstagePassesQuality(pass) {
    const sellIn = pass.sellIn;

    if (sellIn > 10) {
      pass.quality += 1;
    } else if (sellIn >= 6 && sellIn <= 10) {
      pass.quality += 2;
    } else if (sellIn >= 0 && sellIn <= 5) {
      pass.quality += 3;
    } else if (sellIn < 0) {
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

  updateAgedBrieQuality(cheese) {
    cheese.quality += 1;
  }

  updateNormalItemQuality(item) {
    item.sellIn >= 0 ? item.quality -= 1 : item.quality -= 2;
  }

  limitItemQuality(item) {
    item.quality = Math.min(Math.max(item.quality, 0), 50);
  }
}

module.exports = {
  Item,
  Shop,
};
