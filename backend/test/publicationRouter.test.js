const expect = require('expect.js');
const axios = require("axios").default;
const config = require("./axios.config.js").default;

describe("#PublicationRouter", function () {
    let userid; // defined in before all hook
    let usertoken; // defined in before all hook
    let publicationId; // defined in GET suite

    const mockUser = {
        username: "PubTempUser",
        password: "123456"
    }

    const mockPublication = {
        title: "My First Publication",
        description: "Just a test.",
        price: 50,
        currency: "USD",
        phone: "32134231"
    }


    before(async function() {
        // Create User in the database
        const axiosResponse = await axios({
            ...config,
            method: 'POST',
            url: '/user/register',
            data: {
                request_name: "user_register",
                ...mockUser
            },
        });
        userid = axiosResponse.data.metadata.id;
        usertoken = axiosResponse.data.metadata.token;
    });

    after(async function() {
        // Delete the created user
        const anxiosRes = await axios({
            ...config,
            method: 'DELETE',
            url: '/user/delete',
            data: {
                request_name: "user_delete",
                id: userid,
                credentials: {...mockUser}
            },
        });
    });


    describe("POST: /publication/create", function () {
        it("should create publication with correct user credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/publication/create',
                data: {
                    request_name: "publication_create",
                    user_id: userid,
                    ...mockPublication,
                    token: usertoken
                },
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });

        it("should NOT create publicaiton with wrong credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/publication/create',
                data: {
                    request_name: "publication_create",
                    user_id: userid,
                    ...mockPublication,
                    token: "invalid token"
                },
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(403);
        });

        it("should NOT create publicaiton with a userid that doesn't exist", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/publication/create',
                data: {
                    request_name: "publication_create",
                    user_id: "SomeId",
                    ...mockPublication,
                    token: usertoken
                },
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(404);
        });

        it("should NOT create publicaiton with no credentails", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'POST',
                url: '/publication/create',
                data: {
                    request_name: "publication_create",
                    user_id: userid,
                    ...mockPublication
                },
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(400);
        });
    });


    describe("GET: /publication/...", function() {    
        it("should GET limited list of publications", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: '/publication/limit/1',
                data: {request_name: "publication_getLimit"}
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
            
            const publicaitons = res.metadata.data;
            expect(publicaitons).to.be.an("array");
            expect(publicaitons).to.have.length(1);
            expect(publicaitons[0]).to.eql({
                id: publicaitons[0].id,
                user_id: userid,
                ...mockPublication
            });
            publicationId = publicaitons[0].id;
        });

        it("should GET publication information with specific id", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: `/publication/${publicationId}`,
                data: {request_name: "publication_getById"}
            });
            const res = axiosResponse.data;
    
            expect(res.code).to.equal(200);
            expect(res).to.have.property("metadata");
            expect(res.metadata.data).to.eql({
                id: publicationId,
                user_id: userid,
                ...mockPublication
            });
        });

        it("should GET publications, using limit and offset", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: `/publication/limit/1/offset/0`,
                data: {request_name: "publication_getLimitAndOffset"}
            });
            const res = axiosResponse.data;
            const publicaitons = res.metadata.data;
    
            expect(res.code).to.equal(200);
            expect(publicaitons).to.be.an("array");
            expect(publicaitons).to.have.length(1);
            expect(publicaitons[0]).to.eql({
                id: publicationId,
                user_id: userid,
                ...mockPublication
            });
        });

        it("should GET list of publications of specific user", async function () {
            const axiosResponse = await axios({
                ...config,
                method: 'GET',
                url: `/publication/of/user/${userid}`,
                data: {request_name: "publication_getOfUser"}
            });
            const res = axiosResponse.data;
            const publicaitons = res.metadata.data;

            expect(res.code).to.equal(200);
            expect(publicaitons).to.be.an("array");
            expect(publicaitons).to.have.length(1);
            expect(publicaitons[0]).to.eql({
                id: publicationId,
                user_id: userid,
                ...mockPublication
            });
        });
    });


    describe("PATCH: /publication/update", function() {
        it("should update publication title", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/publication/update',
                data: {
                    request_name: "publication_update",
                    id: publicationId,
                    user_id: userid,
                    data: {
                        title: "New Title"
                    },
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });
        
        it("should NOT update publication with wrong credentials", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/publication/update',
                data: {
                    request_name: "publication_update",
                    id: publicationId,
                    user_id: userid,
                    data: {
                        title: "New Title"
                    },
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });

        it("should NOT update publication with no id in the payload", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/publication/update',
                data: {
                    request_name: "publication_update",
                    user_id: userid,
                    data: {
                        title: "New Title"
                    },
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(400);
        });

        it("should NOT update publication with no user_id in the payload", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'PATCH',
                url: '/publication/update',
                data: {
                    request_name: "publication_update",
                    id: publicationId,
                    data: {
                        title: "New Title"
                    },
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(400);
        });
    });


    describe("DELETE: /publication/delete", function() {
        it("should NOT delete publication with wrong credentails", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/publication/delete',
                data: {
                    request_name: "publication_delete",
                    id: publicationId,
                    user_id: userid,
                    token: "invalid token"
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(403);
        });

        it("should send 404 when deleting publication with non-existing id", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/publication/delete',
                data: {
                    request_name: "publication_delete",
                    id: 100,
                    user_id: userid,
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(404);
        });

        it("should send 400 when user_id is missing", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/publication/delete',
                data: {
                    request_name: "publication_delete",
                    id: publicationId,
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(400);
        });

        it("should delete publication successfully", async function() {
            const axiosResponse = await axios({
                ...config,
                method: 'DELETE',
                url: '/publication/delete',
                data: {
                    request_name: "publication_delete",
                    id: publicationId,
                    user_id: userid,
                    token: usertoken
                }
            });
            const res = axiosResponse.data;
            expect(res.code).to.equal(200);
        });
    });
});
