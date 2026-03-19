import { describe, expect, it } from "vitest";
import { createWineSchema, listWinesSchema } from "@/models/validation";

describe("listWinesSchema", () => {
  it("applies defaults and transforms string booleans", () => {
    expect(listWinesSchema.parse({ featuredOnly: "true", hasGlass: "false" })).toEqual({
      page: 1,
      pageSize: 20,
      sort: "createdAt",
      order: "desc",
      featuredOnly: true,
      hasGlass: false
    });
  });

  it("accepts boolean query flags directly", () => {
    expect(listWinesSchema.parse({ hasBottle: true, featuredOnly: false })).toEqual({
      page: 1,
      pageSize: 20,
      sort: "createdAt",
      order: "desc",
      hasBottle: true,
      featuredOnly: false
    });
  });
});

describe("createWineSchema", () => {
  it("accepts a create payload without a slug", () => {
    expect(
      createWineSchema.parse({
        name: "Cabernet",
        vintage: 2020,
        wineryId: "11111111-1111-4111-8111-111111111111",
        regionId: "22222222-2222-4222-8222-222222222222",
        country: "US",
        grapeVarieties: ["Cabernet Sauvignon"],
        alcoholPercent: 13.5,
        description: "Bold",
        imageUrl: "https://example.com/wine.png"
      })
    ).toEqual({
      name: "Cabernet",
      vintage: 2020,
      wineryId: "11111111-1111-4111-8111-111111111111",
      regionId: "22222222-2222-4222-8222-222222222222",
      country: "US",
      grapeVarieties: ["Cabernet Sauvignon"],
      alcoholPercent: 13.5,
      description: "Bold",
      imageUrl: "https://example.com/wine.png"
    });
  });

  it("strips a client-provided slug from the payload", () => {
    expect(
      createWineSchema.parse({
        name: "Cabernet",
        slug: "ignored-by-server",
        vintage: 2020,
        wineryId: "11111111-1111-4111-8111-111111111111",
        regionId: "22222222-2222-4222-8222-222222222222",
        country: "US",
        grapeVarieties: ["Cabernet Sauvignon"],
        alcoholPercent: 13.5,
        description: "Bold",
        imageUrl: "https://example.com/wine.png"
      })
    ).toEqual({
      name: "Cabernet",
      vintage: 2020,
      wineryId: "11111111-1111-4111-8111-111111111111",
      regionId: "22222222-2222-4222-8222-222222222222",
      country: "US",
      grapeVarieties: ["Cabernet Sauvignon"],
      alcoholPercent: 13.5,
      description: "Bold",
      imageUrl: "https://example.com/wine.png"
    });
  });
});
