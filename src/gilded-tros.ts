import { Item } from "./item";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  public updateQuality(): void {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (
        item.name != "Good Wine" &&
        item.name != "Backstage passes for Re:Factor" &&
        item.name != "Backstage passes for HAXX"
      ) {
        if (item.quality > 0) {
          if (item.name != "B-DAWG Keychain") {
            item.quality = item.quality - 1;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;

          if (item.name == "Backstage passes for Re:Factor") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }

            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      }

      if (item.name != "B-DAWG Keychain") {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        if (item.name != "Good Wine") {
          if (
            item.name != "Backstage passes for Re:Factor" ||
            item.name != "Backstage passes for HAXX"
          ) {
            if (item.quality > 0) {
              if (item.name != "B-DAWG Keychain") {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality =
              item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }
}
