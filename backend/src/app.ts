import DataDriver from './database/QueryManager/QueryManager'

const dataDriver = new DataDriver();

dataDriver.connectClient();
dataDriver.query(async () => console.log(await dataDriver.users.getAll()));
dataDriver.execute().then(() => dataDriver.endClient());
