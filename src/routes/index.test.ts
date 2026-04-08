import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "@/app";

describe("routes index", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("serves the wine detail frontend shell by slug route", async () => {
    const response = await request(app).get("/wines/cabernet-2020");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("id=\"wine-detail-root\"");
    expect(response.text).toContain("/static/wine-detail.js");
  });

  it("serves static frontend assets", async () => {
    const response = await request(app).get("/static/wine-detail.js");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("javascript");
    expect(response.text).toContain("loadWineBySlug");
  });

  it("serves the embeddable wine list shell", async () => {
    const response = await request(app).get("/embed/wine-list");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("id=\"wine-list-embed-root\"");
    expect(response.text).toContain("/static/wine-list-embed.js");
  });

  it("serves the admin wines frontend shell", async () => {
    const response = await request(app).get("/admin/wines");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("text/html");
    expect(response.text).toContain("id=\"admin-wines-root\"");
    expect(response.text).toContain("/static/admin-wines.js");
  });

  it("serves embeddable wine list static assets", async () => {
    const response = await request(app).get("/static/wine-list-embed-loader.js");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("javascript");
    expect(response.text).toContain("createPourhouseWineListEmbed");
  });

  it("serves admin wines static assets", async () => {
    const response = await request(app).get("/static/admin-wines.js");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("javascript");
    expect(response.text).toContain("loadAdminBootstrap");
  });

  it("blocks unauthorized access to admin wine routes", async () => {
    const response = await request(app).get("/api/admin/wines");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });

  it("blocks unauthorized access to admin wine options", async () => {
    const response = await request(app).get("/api/admin/wine-options");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Unauthorized" });
  });
});
