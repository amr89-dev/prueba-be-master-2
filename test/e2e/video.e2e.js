const request = require("supertest");
const createServer = require("../../src/app");

describe("Tests for /videos path", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createServer();
    server = app.listen(9000);
    api = request(app);
  });

  describe("GET /videos", () => {
    it("should return a 200 OK and an array of  public videos", async () => {
      const res = await api.get("/api/v1/videos/");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("isPublic");
      expect(res.body[0].isPublic).toBe(true);
    });
  });

  describe("PATCH /:videoId", () => {
    it("should return a 404 Not Found when the video does not exist", async () => {
      const videoId = "1234567a-b89c-12d3-e456-112233456789";
      const res = await api.patch(`/api/v1/videos/${videoId}`);
      expect(res.statusCode).toEqual(404);
    });
  });

  afterAll(() => {
    server.close();
  });
});
