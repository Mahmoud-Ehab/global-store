const expect = require("expect.js");
const { Dispatcher, UserReqBuilder } = require("../dist/frontend/src/RequestDispatcherImpl");

describe("#RequestDispatcher", function() {
  describe("testing user-related requests by UserReqBuilder", function() {
    const builder = new UserReqBuilder();
    const mockUser = {
      username: "NewUser",
      password: "123321123",
      id: undefined,
      nickname: "Mahmoud",
    }

    after(async function() {
      if (!mockUser.id)
        return

      await Dispatcher.dispatch(builder.remove(
        mockUser.id, 
        {
          username: mockUser.username,
          password: mockUser.password
        }
      ))
    })

    it("should register new user with username and password", async function() {
      const response = await Dispatcher.dispatch(builder.register({
        username: mockUser.username, 
        password: mockUser.password
      }))
      
      const data = response.data;
      expect(data.code).to.equal(200);
      expect(data.metadata).to.be.ok;
      mockUser.id = data.metadata.id;
    })

    it("should login successfully using the cred of mockUser", async function() {
      const response = await Dispatcher.dispatch(builder.login({
        username: mockUser.username,
        password: mockUser.password
      }))

      const data = response.data;
      expect(data.code).to.equal(200);
    })

    it("should update user data, and set a nickname for the user", async function() {
      const response = await Dispatcher.dispatch(builder.update(
        mockUser.id,
        {
          username: mockUser.username,
          password: mockUser.password
        },
        {
          nickname: mockUser.nickname
        }
      ))

      const data = response.data;
      expect(data.code).to.equal(200);
    })

    it("should retrieve user data successfully", async function() {
      const response = await Dispatcher.dispatch(builder.get().id(mockUser.id));
      const data = response.data;
      expect(data.code).to.equal(200);
      expect(data.metadata.data.nickname).to.eql(mockUser.nickname);
      expect(data.metadata.data.password).to.be.undefined;
    })

    it("should delete the registered user using the right cred", async function() {
      const response = await Dispatcher.dispatch(builder.remove(
        mockUser.id, 
        {
          username: mockUser.username,
          password: mockUser.password
        }
      ))

      const data = response.data;
      expect(data.code).to.equal(200);
      mockUser.id = undefined;
    })
  })
})