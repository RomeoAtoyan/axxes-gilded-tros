import { Item } from "./item";

type ItemCategory =
  | "GOOD_WINE"
  | "BACKSTAGE_PASS"
  | "LEGENDARY_ITEM"
  | "SMELLY_ITEM"
  | "NORMAL_ITEM";

export class GildedTros {
  constructor(public items: Array<Item>) {}

  private isGoodWine(item: Item): boolean {
    return item.name === "Good Wine";
  }

  private isBackstagePass(item: Item): boolean {
    return (
      item.name === "Backstage passes for Re:Factor" ||
      item.name === "Backstage passes for HAXX"
    );
  }

  private isLegendary(item: Item): boolean {
    return item.name === "B-DAWG Keychain";
  }

  private getCategory(item: Item): ItemCategory {
    if (this.isGoodWine(item)) return "GOOD_WINE";
    if (this.isBackstagePass(item)) return "BACKSTAGE_PASS";
    if (this.isLegendary(item)) return "LEGENDARY_ITEM";
    return "NORMAL_ITEM";
  }

  private increaseQuality(item: Item, amount: number): void {
    if (this.isLegendary(item)) {
      return;
    }

    if (item.quality < 50) {
      item.quality = Math.min(50, item.quality + amount);
    }
  }

  private decreaseQuality(item: Item, amount: number): void {
    if (this.isLegendary(item)) {
      return;
    }

    if (item.quality > 0) {
      item.quality = Math.min(0, item.quality - amount);
    }
  }

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
            item.name != "Backstage passes for Re:Factor" &&
            item.name != "Backstage passes for HAXX"
          ) {
            if (item.quality > 0) {
              if (item.name != "B-DAWG Keychain") {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
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
