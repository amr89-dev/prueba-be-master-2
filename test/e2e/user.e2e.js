const request = require("supertest");
const createServer = require("../../src/app");

describe("Tests for /user path", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createServer();
    server = app.listen(9000);
    api = request(app);
  });

  describe("POST /users", () => {
    it("should return a 400 bad request", async () => {
      const inputData = {
        email: "",
        password: "",
      };
      const res = await api.post("/api/v1/users").send(inputData);
      expect(res).toBeTruthy();
      expect(res.statusCode).toEqual(400);
    });

    it("should return a 201 created", async () => {
      const inputData = {
        email: "user@mail.com",
        password: "12345678",
      };
      const res = await api.post("/api/v1/users").send(inputData);
      expect(res).toBeTruthy();
    });
  });

  describe("GET /users", () => {
    it("should return a 200 ok and an array with an object containing email, id and role", async () => {
      const res = await api.get("/api/v1/users");
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      const { id, email, role } = res.body[0];
      expect(id).toBeDefined();
      expect(email).toBeDefined();
      expect(role).toBeDefined();
    });
  });

  describe("PATCH /users/:id", () => {
    it("should return a 404 Not Found when the user does not exist", async () => {
      const res = await api
        .patch("/api/v1/users/999999")
        .send({ email: "newemail@mail.com" });
      expect(res.statusCode).toEqual(404);
    });
  });

  afterAll(() => {
    server.close();
  });
});
