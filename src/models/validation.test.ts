import { describe, expect, it } from "vitest";
import { listWinesSchema } from "@/models/validation";

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
