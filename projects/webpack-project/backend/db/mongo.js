const MongoClient = require('mongodb').MongoClient;
const config = require('./db.config.js');
const ObjectID = require('mongodb').ObjectID;

var client;
var db;

module.exports = {
  // 连接数据库
  connect() {
    return new Promise(resolve => {
      MongoClient.connect(
        config.uri,
        { useNewUrlParser: true },
        (err, _client) => {
          if (err) throw err;
          client = _client;
          db = client.db(config.dbName);
          console.log('成功连接数据库');
          resolve(db);
        }
      );
    });
  },
  // 关闭数据库
  close() {
    if (client) {
      client.close();
    }
  },
  // 新增数据模型 return的话默认加了await,不用多传回调函数，否则后面加个回调函数(处理结果)。
  async insertOne(collectionName, model) {
    console.log('collectionName: ',collectionName,model)
    return db.collection(collectionName).insertOne(model);
  },
  // 修改数据模型
  async updateOne(collectionName, query, data) {
    return db.collection(collectionName).updateOne(query, {
      $set: data,
      $currentDate: { lastModified: true }
    });
  },
  // 修改数据模型
  async updateMany(collectionName, query, data) {
    return db.collection(collectionName).updateMany(query, {
      $set: data,
      $currentDate: { lastModified: true }
    });
  },
  // 通过id查找对象并且修改数据模型
  async updateOneByID(collectionName, id, data, increments) {
    let model = {
      $currentDate: { lastModified: true }
    };
    if (data) {
      model.$set = data;
    }
    if (increments) {
      model.$inc = increments;
    }
    return db.collection(collectionName).updateOne(
      {
        _id: ObjectID(id)
      },
      model
    );
  },
  // 删除数据模型
  async deleteOne(collectionName, query) {
    return db.collection(collectionName).deleteOne(query);
  },
  // 通过id删除数据模型
  async deleteOneByID(collectionName, id) {
    return db.collection(collectionName).deleteOne({
      _id: ObjectID(id)
    });
  },
  // 查询数据
  async find(collectionName, query, sort = '_id', asc = true) {
    let order = asc ? 1 : -1;
    return db
      .collection(collectionName)
      .find(query)
      .sort({ [sort]: order })
      .toArray();
  },
  // 分页查询数据
  async findPaginationData(
    collectionName,
    query,
    paginationModel,
    sort = '_id',
    asc = true
  ) {
    let order = asc ? 1 : -1;
    const temp = db.collection(collectionName).find(query);
    const count = await temp.count();
    const data = await temp
      .sort({ [sort]: order })
      .skip(paginationModel.pageIndex * paginationModel.pageSize)
      .limit(paginationModel.pageSize)
      .toArray();
    return { count, data };
  },
  // 获取session
  getSession() {
    return client.startSession();
  },
  // 聚合查询数据
  async aggregate(collectionName, lookup, query, sort = '_id', asc = true) {
    let order = asc ? 1 : -1;
    return db
      .collection(collectionName)
      .aggregate([
        { $lookup: lookup },
        { $match: query },
        { $sort: { [sort]: order } }
      ])
      .toArray();
  }
};
