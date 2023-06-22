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

      limitQuality(item);
    })
  }

  updateBackstagePassesQuality(pass) {
    const sellIn = pass.sellIn
    let quality = pass.quality

    if (sellIn > 10) {
      quality += 1;
    } else if (sellIn >= 6 && sellIn <= 10) {
      quality += 2;
    } else if (sellIn >= 0 && sellIn <= 5) {
      quality += 3;
    } else if (sellIn < 0) {
      quality = 0;
    }
  }

  updateConjuredItemQuality(conjuredItem) {
    let quality = conjuredItem.quality

    if (conjuredItem.sellIn >= 0) {
      quality -= 2;
    } else {
      quality -= 4;
    }
  }

  updateAgedBrieQuality(cheese) {
    cheese.quality += 1;
  }

  updateNormalItemQuality(item) {
    item.sellIn >= 0 ? item.quality -= 1 : item.quality -= 2;
  }

  limitQuality(item) {
    item.quality = Math.min(Math.max(item. quality, 0), 50);
  }
}

module.exports = {
  Item,
  Shop
}
