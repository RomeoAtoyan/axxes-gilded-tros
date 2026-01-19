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
    if (this.isSmelly(item)) return "SMELLY_ITEM";
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

  private decreaseSellIn(item: Item): void {
    if (!this.isLegendary(item)) {
      item.sellIn -= 1;
    }
  }

  private isExpired(item: Item): boolean {
    return item.sellIn < 0;
  }

  private isSmelly(item: Item): boolean {
    return (
      item.name == "Duplicate Code" ||
      item.name == "Long Methods" ||
      item.name == "Ugly Variable Names"
    );
  }

  private updateItem(item: Item): void {
    const category = this.getCategory(item);

    switch (category) {
      case "SMELLY_ITEM":
        this.decreaseQuality(item, 2);
        break;
      case "NORMAL_ITEM":
        this.decreaseQuality(item, 1);
        break;
      case "GOOD_WINE":
        this.increaseQuality(item, 1);
        break;
      case "BACKSTAGE_PASS":
        this.increaseQuality(item, 1);
        if (item.sellIn <= 10) {
          this.increaseQuality(item, 1);
        }

        if (item.sellIn <= 5) {
          this.increaseQuality(item, 1);
        }
        break;
      case "LEGENDARY_ITEM":
        break;
    }

    this.decreaseSellIn(item);

    if (this.isExpired(item)) {
      switch (category) {
        case "SMELLY_ITEM":
          this.decreaseQuality(item, 2);
          break;
        case "GOOD_WINE":
          this.increaseQuality(item, 1);
          break;
        case "BACKSTAGE_PASS":
          item.quality = 0;
          break;
        case "NORMAL_ITEM":
          this.decreaseQuality(item, 1);
          break;
        case "LEGENDARY_ITEM":
          break;
      }
    }
  }

  public updateQuality(): void {
    for (const item of this.items) {
      this.updateItem(item);
    }
  }
}
