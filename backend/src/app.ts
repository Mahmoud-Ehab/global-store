import client from './Database/client'
import UsersController from './Database/controllers/UsersController'
import DataDriver from './DataDriver'

// Trying the Database & DataDriver pre-implementation
const dataDriver = new DataDriver({
  users: new UsersController(client),
});

client.connect();
const user1 = dataDriver.getUsers()?.get(1);
user1?.then(res => {
  console.log(res)
  client.end();
})
.catch(e => console.error(e));
