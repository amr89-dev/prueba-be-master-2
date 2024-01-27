const request = require("supertest");
const createServer = require("../../src/app");

describe("Tests for /auth path", () => {
  let app = null;
  let server = null;
  let api = null;

  beforeAll(() => {
    app = createServer();
    server = app.listen(9000);
    api = request(app);
  });

  describe("POST /login", () => {
    it("should return a 200 OK and the user data with access and refresh tokens when the credentials are valid", async () => {
      const userCredentials = {
        email: "user@mail.com",
        password: "12345678",
      };
      // Asegúrate de que el usuario exista en la base de datos
      const res = await api.post("/api/v1/auth/login").send(userCredentials);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");
    });

    it("should return a 401 Unauthorized when the credentials are invalid", async () => {
      const userCredentials = {
        email: "user@mail.com",
        password: "wrongpassword",
      };
      const res = await api.post("/api/v1/auth/login").send(userCredentials);
      expect(res.statusCode).toEqual(401);
    });
  });

  afterAll(() => {
    server.close();
  });
});
