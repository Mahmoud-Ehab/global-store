const expect = require("expect.js");
const { StateManager, User, UserList } = require("../dist/StateManagerImpl");

describe("#StateManager", function() {
  const user1 = {
    user_id: "1",
    username: "Mahmoud Ehab"
  };
  const user2 = {
    user_id: "2",
    username: "Ahmed Ehab"
  };
  const user3 = {
    user_id: "3",
    username: "Ehab Ayman"
  };
  let lic = ""; // (lastInvokedCallback) used in callbacks tests

  describe("User Related States", function() {
    it("should create, store, and retrieve user 1, 2 and 3 info", function() {
      StateManager.addEntity("user1", new User(user1));
      StateManager.addEntity("user2", new User(user2));
      StateManager.addEntity("user3", new User(user3));
      
      const data = StateManager.toObject();
      expect(data.user1.info).to.eql(user1);
      expect(data.user2.info).to.eql(user2);
      expect(data.user3.info).to.eql(user3);
    });

    it("should create UsersList and add users to it", function() {
      const users = new UserList();
      users.addEntity("user1", StateManager.get("user1"));
      users.addEntity("user2", StateManager.get("user2"));
      users.addEntity("user3", StateManager.get("user3"));
      StateManager.addEntity("users", users);
      
      const data = StateManager.toObject();
      expect(data.users.user1.info).to.eql(user1);
      expect(data.users.user2.info).to.eql(user2);
      expect(data.users.user3.info).to.eql(user3);
    });

    it("should subscribe callbacks to states", function() {
      const user1 = StateManager.get("user1");
      const user2 = StateManager.get("user2");
      const u1cb = user1.subscribe(() => lic = "user1");
      const u2cb = user2.subscribe(() => lic = "user2");

      expect(u1cb).to.equal(0);
      expect(u2cb).to.equal(0);
    });

    it("should update user 1 info and invoke the callback", function() {
      const user1 = StateManager.get("user1");
      user1.update("info", {username: "MoEhab"});

      const data = StateManager.toObject();
      expect(data.user1.info.username).to.equal("MoEhab");
      expect(data.users.user1.info.username).to.equal("MoEhab");
      expect(lic).to.equal("user1");
    });

    it("should NOT invoke user 2 callbacks when get updated with the same info", function() {
      const user2_state = StateManager.get("user2");
      user2_state.update("info", user2);
      expect(lic).to.not.equal("user2");
    });
    
    it("should erase user 1 info", function() {
      const removed = StateManager.get("user1").remove("info");
      const data = StateManager.toObject();
      expect(removed).to.be(true);
      expect(data.user1.info).to.equal(undefined);
    });

    it("should remove user1 state from StateManager", function() {
      const removed = StateManager.remove("user1");
      const data = StateManager.toObject();
      expect(removed).to.be(true);
      expect(data.user1).to.equal(undefined);
    });

    it("should remove the users from the list", function() {
      const users = StateManager.get("users");
      users.remove("user1");
      users.remove("user2");
      users.remove("user3");

      const data = StateManager.toObject();
      expect(data.users).to.eql({});
    });
  });
});