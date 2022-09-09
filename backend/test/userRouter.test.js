const expect = require('expect.js');
const axios = require("axios").default;
const config = require("./axios.config.js").default;

describe("Testing UserRouter Endpoints", function () {
    const registeredIds = [];

    describe("POST: /user/register", function () {
        it("should successfully register user 1", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/register',
                data: {
                    username: "user 1",
                    password: "123456"
                },
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(200);
            expect(res).to.have.property("metadata");
            expect(res.metadata).to.have.property("id");
            registeredIds.push(res.metadata.id);
        });
    
        it("should successfully register user 2", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/register',
                data: {
                    username: "user 2",
                    password: "654321"
                }
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(200);
            expect(res).to.have.property("metadata");
            expect(res.metadata).to.have.property("id");
            registeredIds.push(res.metadata.id);
        });
    
        it("should fail registering an existing username", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/register',
                data: {
                    username: "user 2",
                    password: "654321"
                }
            });
            const res = axiosResponse.data;

            expect(res.code).to.equal(409);
        });
    
        it("should fail registering a user with no username", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/register',
                data: {
                    password: "123456",
                }
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(400);
        });
    
        it("should fail registering a user with no passowrd", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/register',
                data: {
                    username: "user 3",
                }
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(400);
        });
    });


    describe("GET: /user/...", function() {
        it("should GET user 1 information, with the password unrevealed", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: `/user/${registeredIds[0]}`,
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(200);
            expect(res).to.have.property("metadata");
            expect(res.metadata.data.username).to.equal("user 1");
            expect(res.metadata.data.password).to.be.undefined;
        });
    
        it("should GET limited list of users, with the passwords unrevealed", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: '/user/limit/2',
            });
            const res = axiosResponse.data;
            const users = res.metadata.data;
    
            expect(res.code).to.equal(200);
            expect(users.length).to.equal(2);
            expect(users[0].username).to.equal("user 1");
            expect(users[0].password).to.be.undefined;
            expect(users[1].username).to.equal("user 2");
            expect(users[1].password).to.be.undefined;
        });
    });


    describe("POST: /user/login", function() {
        it("should sign user 1 in successfully", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/login',
                data: {
                    username: "user 1",
                    password: "123456"
                }
            });
            const res = axiosResponse.data;

            expect(res.code).to.equal(200);
            expect(res.metadata.auth).to.be.true;
        });

        it("should NOT sign user in with wrong credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/login',
                data: {
                    username: "user 1",
                    password: "123451"
                }
            });
            const res = axiosResponse.data;

            expect(res.code).to.equal(401);
        });

        it("should NOT sign in a non-existing user", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/user/login',
                data: {
                    username: "user 100",
                    password: "123321"
                }
            });
            const res = axiosResponse.data;

            expect(res.code).to.equal(404);
        });
    });


    describe("PATCH: /user/update", function() {
        it("should update user 2 to user 3", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/user/update',
                data: {
                    id: registeredIds[1],
                    username: "user 2",
                    password: "654321",
                    data: {
                        username: "user 3"
                    }
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });

        it("should NOT update user 1 using wrong credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/user/update',
                data: {
                    id: registeredIds[0],
                    username: "user 1",
                    password: "654321",
                    data: {
                        username: "user 2"
                    }
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(401);
        });

        it("should NOT update users id", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/user/update',
                data: {
                    id: registeredIds[0],
                    username: "user 1",
                    password: "654321",
                    data: {
                        id: "newid",
                    }
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(400);
        });
    });


    describe("DELETE: /user/delete", function() {
        it("should NOT be able to delete user with wrong credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/user/delete',
                data: {
                    id: registeredIds[0],
                    username: "user 1",
                    password: "123321"
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(401);
        });

		it("should send 404 status code when tring to delete non-existing user", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/user/delete',
                data: {
                    id: "non-existing",
                    username: "user 1",
                    password: "123456"
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(404);
        });

        it("should delete user 1 successfully", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/user/delete',
                data: {
                    id: registeredIds[0],
                    username: "user 1",
                    password: "123456"
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });

        it("should delete user 3 successfully", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/user/delete',
                data: {
                    id: registeredIds[1],
                    username: "user 3",
                    password: "654321"
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });
    });
});
