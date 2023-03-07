const expect = require('expect.js');
const axios = require("axios").default;
const config = require("./axios.config.js").default;

describe('#ReviewRouter', function() {
  let userid; // defined in before hook
  let usertoken; // defined in before all hook
  let pubid; // defined in before hook

  const mockUser = {
    username: "RevTempUser",
    password: "123456"
  }

  const mockPublication = {
    title: "My First Publication",
    description: "Just a test.",
    price: 50,
    currency: "USD",
    phone: "32134231"
  }

  const mockReview = {
    title: "review title",
    body: "some review body text here"
  }


  before(async function() {
    // Create User
    const userAxiosRes = await axios({
      ...config,
      method: 'POST',
      url: '/user/register',
      data: {
        ...mockUser
      },
    });
    userid = userAxiosRes.data.metadata.id;
    usertoken = userAxiosRes.data.metadata.token;

    // Create publication
    await axios({
      ...config,
      method: 'POST',
      url: '/publication/create',
      data: {
        user_id: userid,
        ...mockPublication,
        token: usertoken
      },
    });

    const publication = (await axios({
      ...config,
      method: 'GET',
      url: `/publication/of/user/${userid}`,
    })).data.metadata.data[0];
    pubid = publication.id;
  })

  after(async function() {
    // Delete the created user
    await axios({
      ...config,
      method: 'DELETE',
      url: '/user/delete',
      data: {
        id: userid,
        credentials: {...mockUser}
      },
    });
  })

  describe('POST: /review/create', function() {
    it("should create review successfully", async function() {
      const res = (await axios({
        ...config,
        method: 'POST',
        url: '/review/create',
        data: {
          user_id: userid,
          publication_id: pubid,
          ...mockReview,
          token: usertoken
        }
      })).data;
      
      expect(res.code).to.equal(200);
    })

    it("should NOT create review with invalid user credentials", async function() {
      const res = (await axios({
        ...config,
        method: 'POST',
        url: '/review/create',
        data: {
          user_id: userid,
          publication_id: pubid,
          ...mockReview,
          token: "invalid token"
        }
      })).data;
      expect(res.code).to.equal(403);
    })

    it("should NOT create review with incomplete request payload", async function() {
      const res = (await axios({
        ...config,
        method: 'POST',
        url: '/review/create',
        data: {
          publication_id: pubid,
          ...mockReview,
          token: usertoken
        }
      })).data;
      expect(res.code).to.equal(400);
    })

    it("should raise 404 error when using non-existing publication id", async function() {
      const res = (await axios({
        ...config,
        method: 'POST',
        url: '/review/create',
        data: {
          user_id: userid,
          publication_id: -1,
          ...mockReview,
          token: usertoken
        }
      })).data;
      expect(res.code).to.equal(404);
    })
  })


  describe('GET: /review/...', function() {
    it("should get review info successfully", async function() {
      const res = (await axios({
        ...config,
        method: 'GET',
        url: `/review/of/publication/${pubid}/of/user/${userid}`
      })).data;
      expect(res.code).to.equal(200);
      expect(res.metadata.data.user).to.be.ok;
      expect(res.metadata.data).to.eql({
        user_id: userid,
        publication_id: pubid,
        ...mockReview,
        user: res.metadata.data.user
      });
    })

    it("should get list of reviews of a specific user", async function() {
      const res = (await axios({
        ...config,
        method: 'GET',
        url: `/review/of/user/${userid}`
      })).data;
      const reviews = res.metadata.data;
      expect(res.code).to.equal(200);
      expect(reviews).to.be.an('array');
      for (const review of reviews) {
        expect(review.user_id).to.equal(userid);
        expect(review.publication_id).to.be.ok();
        expect(review.title).to.be.ok();
        expect(review.body).to.be.ok();
      }
    })

    it("should get list of reviews on a specific publication", async function() {
      const res = (await axios({
        ...config,
        method: 'GET',
        url: `/review/of/publication/${pubid}`
      })).data;
      const reviews = res.metadata.data;
      expect(res.code).to.equal(200);
      expect(reviews).to.be.an('array');
      for (const review of reviews) {
        expect(review.user_id).to.be.ok();
        expect(review.publication_id).to.equal(pubid);
        expect(review.title).to.be.ok();
        expect(review.body).to.be.ok();
        expect(review.username).to.be.ok();
      }
    })
  })


  describe('DELETE: /review/delete', function() {
    it("should NOT delete the review using invalid credentials", async function() {
      const res = (await axios({
        ...config,
        method: 'DELETE',
        url: '/review/delete',
        data: {
          user_id: userid,
          publication_id: pubid,
          token: "invalid token"
        }
      })).data;
      expect(res.code).to.equal(403);
    })

    it("should raise BadRequest Error when not passing any id", async function() {
      const res = (await axios({
        ...config,
        method: 'DELETE',
        url: '/review/delete',
        data: {
          publication_id: pubid,
          token: usertoken
        }
      })).data;
      expect(res.code).to.equal(400);
    })

    it("should raise NotFound Error when using any non-existing id", async function() {
      const res = (await axios({
        ...config,
        method: 'DELETE',
        url: '/review/delete',
        data: {
          user_id: userid,
          publication_id: -1,
          token: usertoken
        }
      })).data;
      expect(res.code).to.equal(404);
    })

    it("should delete the created review", async function() {
      const res = (await axios({
        ...config,
        method: 'DELETE',
        url: '/review/delete',
        data: {
          user_id: userid,
          publication_id: pubid,
          token: usertoken
        }
      })).data;
      expect(res.code).to.equal(200);
    })
  })
})