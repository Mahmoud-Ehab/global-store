import DataDriver from './Database/DataDriver'

const dataDriver = new DataDriver();

dataDriver.connectClient();
dataDriver.query(async () => console.log(await dataDriver.users.getAll()));
dataDriver.execute().then(() => dataDriver.endClient());
