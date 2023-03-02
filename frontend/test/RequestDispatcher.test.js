const expect = require("expect.js");
const { 
  Dispatcher, 
  UserReqBuilder,
  PubReqBuilder
} = require("../dist/frontend/src/RequestDispatcherImpl");

const mockUser1 = {
  username: "user1",
  password: "123123123",
  id: undefined
}
const mockUser2 = {
  username: "user2",
  password: "32131321",
  id: undefined
}
const mockPub1 = {
  user_id: mockUser1.id,
  title: "the first publication",
  description: "Just some mock publication no thing important here.",
  price: 123,
  currency: "EGP",
  phone: "012345678"
}
const mockPub2 = {
  user_id: mockUser2.id,
  title: "the second publication",
  description: "Just some mock publication no thing important here.",
  price: 321,
  currency: "EGP",
  phone: "011654321"
}

const userBuilder = new UserReqBuilder();
const pubBuilder = new PubReqBuilder();

describe.only("#RequestDispatcher", function() {
  describe("##UserReqBuilder", function() {
    const mockUser = {
      username: "NewUser",
      password: "123321123",
      id: undefined,
      nickname: "Mahmoud",
    }

    after(async function() {
      if (!mockUser.id)
        return

      await Dispatcher.dispatch(userBuilder.remove(
        mockUser.id, 
        {
          username: mockUser.username,
          password: mockUser.password
        }
      ))
    })

    it("should register new user with username and password", async function() {
      const response = await Dispatcher.dispatch(userBuilder.register({
        username: mockUser.username, 
        password: mockUser.password
      }))
      
      const data = response.data;
      expect(data.code).to.equal(200);
      expect(data.metadata).to.be.ok();
      mockUser.id = data.metadata.id;
    })

    it("should login successfully using the cred of mockUser", async function() {
      const response = await Dispatcher.dispatch(userBuilder.login({
        username: mockUser.username,
        password: mockUser.password
      }))

      const data = response.data;
      expect(data.code).to.equal(200);
    })

    it("should update user data, and set a nickname for the user", async function() {
      const response = await Dispatcher.dispatch(userBuilder.update(
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
      const response = await Dispatcher.dispatch(userBuilder.get().id(mockUser.id));
      const data = response.data;
      expect(data.code).to.equal(200);
      expect(data.metadata.data.nickname).to.eql(mockUser.nickname);
      expect(data.metadata.data.password).to.be.undefined;
    })

    it("should delete the registered user using the right cred", async function() {
      const response = await Dispatcher.dispatch(userBuilder.remove(
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

  describe("##PubReqBuilder", function() {
    before(async function() {
      // add the mock users first before all publication tests
      const res1 = await Dispatcher.dispatch(userBuilder.register({
        username: mockUser1.username,
        password: mockUser1.password
      }));
      mockUser1.id = res1.data.metadata.id;
      mockPub1.user_id = mockUser1.id;

      const res2 = await Dispatcher.dispatch(userBuilder.register({
        username: mockUser2.username,
        password: mockUser2.password
      }));
      mockUser2.id = res2.data.metadata.id;
      mockPub2.user_id = mockUser2.id;
    })

    after(function () {
      // remove all mock data that involved in publication tests
      Dispatcher.dispatch(userBuilder.remove(
        mockUser1.id,
        {
          username: mockUser1.username,
          password: mockUser1.password
        }
      ));
      Dispatcher.dispatch(userBuilder.remove(
        mockUser2.id,
        {
          username: mockUser2.username,
          password: mockUser2.password
        }
      ));
      // the publications will get removed automatically by the server
    })

    it("should create two publications (mockPub1 & mockPub2)", async function () {
      const res1 = await Dispatcher.dispatch(pubBuilder.create(mockPub1, mockUser1));
      const res2 = await Dispatcher.dispatch(pubBuilder.create(mockPub2, mockUser2));
      expect(res1.data.code).to.equal(200);
      expect(res2.data.code).to.equal(200);
    })

    it("should get list of publications of a specific user (say, mockUser1)", async function () {
      const res = await Dispatcher.dispatch(pubBuilder.get().ofUser(mockUser1.id));
      const payload = res.data;
      const publications = payload.metadata.data;
      expect(payload.code).to.equal(200);
      expect(publications).to.be.an("array");
      expect(publications).to.have.length(1);
      for (let key in mockPub1)
        expect(publications[0][key]).to.eql(mockPub1[key]);
    })

    it("should get list of publications with a specific limit", async function () {
      const res = await Dispatcher.dispatch(pubBuilder.get().limit(2));
      const payload = res.data;
      const publications = payload.metadata.data;
      
      expect(publications).to.be.an("array");
      expect(publications).to.have.length(2);
      for (let key in mockPub1) {
        expect(publications[0][key]).to.equal(mockPub1[key]);
        expect(publications[1][key]).to.equal(mockPub2[key]);
      }
      mockPub1.id = publications[0].id;
      mockPub2.id = publications[1].id;
    })

    it("should get list of publications with a specific limit and offset", async function () {
      const res = await Dispatcher.dispatch(pubBuilder.get().limitAndOffset(1, 1));
      const payload = res.data;
      const publications = payload.metadata.data;
      
      expect(publications).to.be.an("array");
      expect(publications).to.have.length(1);
      for (let key in mockPub2)
        expect(publications[0][key]).to.equal(mockPub2[key]);
    })

    it("should update the content of publications", async function () {
      const res = await Dispatcher.dispatch(pubBuilder.update(
        mockPub1, 
        mockUser1,
        {title: "Just a New Title!"}
      ));
      expect(res.data.code).to.equal(200);
    })

    it("should remove the publications", async function () {
      const res1 = await Dispatcher.dispatch(pubBuilder.remove(mockPub1, mockUser1));
      const res2 = await Dispatcher.dispatch(pubBuilder.remove(mockPub2, mockUser2));
      expect(res1.data.code).to.equal(200);
      expect(res2.data.code).to.equal(200);
    })
  })

  describe("##ReviewReqBuilder", function() {
    it("", async function () {})
    it("", async function () {})
    it("", async function () {})
    it("", async function () {})
    it("", async function () {})
  })
})