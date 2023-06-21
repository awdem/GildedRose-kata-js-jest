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
          this.updateAgedBrieQuality(item);
          break;
        case "Sulfuras, Hand of Ragnaros":
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.updateBackstagePassesQuality(item);
          break;
        case 'Conjured Mana Cake':
          this.updateConjuredItemQuality(item);
          break;
        default:
          item.sellIn >= 0 ? item.quality -= 1 : item.quality -= 2;
      }
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

    if (pass.quality > 50) {
      pass.quality = 50;
    }
  }

  updateAgedBrieQuality(brie) {
    if (brie.quality < 50) {
      brie.quality += 1;
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
