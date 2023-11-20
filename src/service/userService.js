// const UserRepository = require(`../repository/user.repository`);
const db = require(`../helpers/database`);
const { v4: uuidv4 } = require("uuid");

class UserService {
  constructor() {
    this.tableName = "User_dynamo1";
  }

  async findAll() {
    const params = {
      TableName: this.tableName,
    };
    const data = await db.scan(params).promise();
    console.log(data);
    return data;
  }

  async findByID(Id) {
    const params = {
      TableName: this.tableName,
      Key: {
        Id,
      },
    };
    try {
      const data = await db.get(params).promise();
      console.log(data);
      return data.Item;
    } catch (err) {
      console.log(err);
    }
  }

  async create(data) {
    const params = {
      TableName: this.tableName,
      Item: {
        Id: uuidv4(),
        Username: data.Username,
        Address: data.Address,
        Age: data.age,
      },
    };
    const res = await db.put(params).promise();
    console.log(res);
    return params.Item;
  }

  async update(Id, data) {

    const prevData = await this.findByID(Id);
    const params = {
      TableName: this.tableName,
      Key: {
        Id,
      },
      UpdateExpression: `set #Username = :Username, #Address = :Address, #Age = :Age`,
      ExpressionAttributeNames: {
        "#Username": `Username`,
        "#Address": `Address`,
        "#Age": `Age`
      },
      ExpressionAttributeValues: {
        ":Username": data.Username || prevData.Username,
        ":Address": data.Address || prevData.Address,
        ":Age": data.Age || prevData.Age,
      },
      ReturnValues: `UPDATED_NEW`,
    };

    console.log(params);
    try {
      const update = await db.update(params).promise();
      return update;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteByID(Id) {
    const params = {
      TableName: this.tableName,
      Key: {
        Id,
      },
    };
    try {
      return await db.delete(params).promise();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserService();
