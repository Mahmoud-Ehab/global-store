const expect = require("expect.js");
const { 
  Dispatcher, 
  UserReqBuilder,
  PubReqBuilder,
  RevReqBuilder
} = require("../js/frontend/src/RequestDispatcherImpl");

// Mock Users Data
const mockUser1 = {
  username: "user1",
  password: "123123123",
  id: "",
  token: ""
}
const mockUser2 = {
  username: "user2",
  password: "32131321",
  id: "",
  token: ""
}

// Mock Publications Data
const mockPub1 = {
  user_id: mockUser1.id,
  title: "the first publication",
  description: "Just a mock publication nothing important here.",
  price: 123,
  currency: "EGP",
  phone: "012345678"
}
const mockPub2 = {
  user_id: mockUser2.id,
  title: "the second publication",
  description: "Just a mock publication nothing important here.",
  price: 321,
  currency: "EGP",
  phone: "011654321"
}

// Mock Reviews Data
const mockReview1 = {
  user_id: mockUser1.id,
  publication_id: mockPub2.id,
  title: "Review 1",
  body: "Just a mock review nothing important here."
}
const mockReview2 = {
  user_id: mockUser2.id,
  publication_id: mockPub1.id,
  title: "Review 2",
  body: "Just a mock review nothing important here."
}

const userBuilder = new UserReqBuilder();
const pubBuilder = new PubReqBuilder();
const revBuilder = new RevReqBuilder();

describe("#RequestDispatcher", function() {
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
      const res1 = await Dispatcher.dispatch(userBuilder.register(mockUser1));
      mockUser1.id = res1.data.metadata.id;
      mockUser1.token = res1.data.metadata.token;
      mockPub1.user_id = mockUser1.id;

      const res2 = await Dispatcher.dispatch(userBuilder.register(mockUser2));
      mockUser2.id = res2.data.metadata.id;
      mockUser2.token = res2.data.metadata.token;
      mockPub2.user_id = mockUser2.id;
    })

    after(async function () {
      // remove all mock data that involved in publication tests
      // the publications will get removed automatically by the server
      await Dispatcher.dispatch(userBuilder.remove(
        mockUser1.id,
        {
          username: mockUser1.username,
          password: mockUser1.password
        }
      ));
      await Dispatcher.dispatch(userBuilder.remove(
        mockUser2.id,
        {
          username: mockUser2.username,
          password: mockUser2.password
        }
      ));
    })

    it("should create two publications (mockPub1 & mockPub2)", async function () {
      const res1 = await Dispatcher.dispatch(pubBuilder.create(mockPub1, mockUser1.token));
      const res2 = await Dispatcher.dispatch(pubBuilder.create(mockPub2, mockUser2.token));
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
        mockUser1.token,
        {title: "Just a New Title!"}
      ));
      expect(res.data.code).to.equal(200);
    })

    it("should remove the publications", async function () {
      const res1 = await Dispatcher.dispatch(pubBuilder.remove(mockPub1, mockUser1.token));
      const res2 = await Dispatcher.dispatch(pubBuilder.remove(mockPub2, mockUser2.token));
      expect(res1.data.code).to.equal(200);
      expect(res2.data.code).to.equal(200);
    })
  })

  describe("##ReviewReqBuilder", function() {
    before(async function() {
      const res1 = await Dispatcher.dispatch(userBuilder.register(mockUser1));
      const res2 = await Dispatcher.dispatch(userBuilder.register(mockUser2));

      mockUser1.id = res1.data.metadata.id;
      mockUser1.token = res1.data.metadata.token;
      mockUser2.id = res2.data.metadata.id;
      mockUser2.token = res2.data.metadata.token;

      mockPub1.user_id = mockUser1.id;
      mockPub2.user_id = mockUser2.id;

      await Dispatcher.dispatch(pubBuilder.create(mockPub1, mockUser1.token));
      await Dispatcher.dispatch(pubBuilder.create(mockPub2, mockUser2.token));

      const pubsReq = await Dispatcher.dispatch(pubBuilder.get().limit(2));
      const pubs = pubsReq.data.metadata.data;
      mockPub1.id = pubs[0].id;
      mockPub2.id = pubs[1].id;

      mockReview1.user_id = mockUser1.id;
      mockReview2.user_id = mockUser2.id;
      mockReview1.publication_id = mockPub2.id;
      mockReview2.publication_id = mockPub1.id;
    })

    after(async function () {
      await Dispatcher.dispatch(userBuilder.remove(
        mockUser1.id,
        {
          username: mockUser1.username,
          password: mockUser1.password
        }
      ));

      await Dispatcher.dispatch(userBuilder.remove(
        mockUser2.id,
        {
          username: mockUser2.username,
          password: mockUser2.password
        }
      ));
    })

    it("should create review for each publication by each user", async function () {
      const res1 = await Dispatcher.dispatch(revBuilder.create(mockReview1, mockUser1.token));
      const res2 = await Dispatcher.dispatch(revBuilder.create(mockReview2, mockUser2.token));
      expect(res1.data.code).to.equal(200);
      expect(res2.data.code).to.equal(200);
    })

    it("should get the reviews of a specific user", async function () {
      const res = await Dispatcher.dispatch(revBuilder.get().ofUser(mockUser1.id));
      const reviews = res.data.metadata.data;
      expect(res.data.code).to.equal(200)
      expect(reviews).to.have.length(1);
    })

    it("should get the reviews of a specific publication", async function () {
      const res = await Dispatcher.dispatch(revBuilder.get().ofPublication(mockPub2.id));
      const reviews = res.data.metadata.data;
      expect(res.data.code).to.equal(200)
      expect(reviews).to.have.length(1);
    })

    it("should get a specific review with user_id and publication_id", async function () {
      const res = await Dispatcher.dispatch(revBuilder.get().id(mockPub2.id, mockUser1.id));
      const review = res.data.metadata.data;
      expect(res.data.code).to.equal(200);
      for (let key in mockReview1)
        expect(review[key]).to.eql(mockReview1[key]);
    })

    it("should update the content of a review", async function () {
      const res = await Dispatcher.dispatch(revBuilder.update(
        mockReview1,
        mockUser1.token,
        {
          title: "New Title",
          body: "New body text content"
        }
      ));
      expect(res.data.code).to.equal(200);
    })

    it("should successfuly remove reviews by using credentials", async function () {
      const res1 = await Dispatcher.dispatch(revBuilder.remove(mockReview1, mockUser1.token));
      const res2 = await Dispatcher.dispatch(revBuilder.remove(mockReview2, mockUser2.token));
      expect(res1.data.code).to.equal(200);
      expect(res2.data.code).to.equal(200);
    })
  })
})
