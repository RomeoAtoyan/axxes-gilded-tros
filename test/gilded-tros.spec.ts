import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros", () => {
  test("normal item degrades by 1 before expiry", () => {
    const items = [new Item("Normal Item", 10, 20)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(19);
  });

  test("normal item degrades by 2 after expiry", () => {
    const items = [new Item("Normal Item", 0, 20)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].quality).toBe(18);
  });

  test("Quality of an item can never be above 50", () => {
    const items = [new Item("Good Wine", -1, 49)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  test("Legendary items always have a quality of 80", () => {
    const items = [new Item("B-DAWG Keychain", 0, 80)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  test("Backstage passes increase in quality when SellIn value is 10 days or less", () => {
    const items = [new Item("Backstage passes for HAXX", 10, 0)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(2);
  });

  test("Backstage passes increase in quality when SellIn value is 5 days or less", () => {
    const items = [new Item("Backstage passes for HAXX", 5, 0)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(3);
  });

  test("Backstage passes get a quality of 0 after conference is over", () => {
    const items = [new Item("Backstage passes for HAXX", -3, 100)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(-4);
    expect(items[0].quality).toBe(0);
  });

  test("Good Wine quality increases by and additional 1 after expiry", () => {
    const items = [new Item("Good Wine", -3, 40)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(-4);
    expect(items[0].quality).toBe(42);
  });

  test("Good Wine quality increases by 1 before expiry", () => {
    const items = [new Item("Good Wine", 5, 40)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(41);
  });

  test("Smelly items lose quality twice as fast as normal items (before expiry)", () => {
    const items = [new Item("Duplicate Code", 5, 40)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(4);
    expect(items[0].quality).toBe(38);
  });

  test("Smelly items lose quality twice as fast as normal items (after expiry)", () => {
    const items = [new Item("Duplicate Code", 0, 40)];
    const app = new GildedTros(items);
    app.updateQuality();
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(36);
  });
});
