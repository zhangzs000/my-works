const db = require('./db/mongo');

exports.success = data => {
  return {
    success: true,
    data
  };
};

exports.failed = info => {
  return {
    success: false,
    info
  };
};

exports.checkUnique = (
  res,
  collectionName,
  query,
  info,
  callback,
  targetID = ''
) => {
  db.find(collectionName, query).then(data => {
    let pass = true;
    if (data.length !== 0) {
      if (targetID) {
        // 编辑数据时的验证
        // 1. 修改过code与数据库中其他数据冲突 pass = false
        // 2. code未变更 pass = true
        pass = data.some(value => {
          //需要排除当前记录的干扰
          return value._id.toHexString() === targetID;
        });
      } else {
        // 新增数据时验证
        pass = false;
      }
    }
    pass ? callback() : res.send(this.failed(info));
  });
};

const reg = /(\d+):(\d+)~(\d+):(\d+)/;

const createTimeModel = source => {
  let model = {};
  model.date = source.date;
  const result = source.time.match(reg);
  let start = new Date();
  start.setHours(result[1]);
  start.setMinutes(result[2]);
  start.setSeconds(0);
  let end = new Date();
  end.setHours(result[3]);
  end.setMinutes(result[4]);
  end.setSeconds(0);
  model.start = start;
  model.end = end;
  model.time = source.time;
  return model;
};

exports.checkTimeConflict = (model, data, id = '') => {
  // 循环当前课程的时间段
  for (let i = 0; i < model.timeList.length; i++) {
    const currentTime = createTimeModel(model.timeList[i]);
    // 循环不同的已有课程
    for (let j = 0; j < data.length; j++) {
      const targetCourse = data[j];
      if (id && id === targetCourse._id.toString()) {
        continue;
      }
      // 循环指定已有课程的时间段
      for (let k = 0; k < targetCourse.timeList.length; k++) {
        const compareTime = createTimeModel(targetCourse.timeList[k]);
        // 判断时间段是否冲突
        if (currentTime.date === compareTime.date) {
          // 星期几相同
          const currentStartTime = currentTime.start.getTime();
          const compareStartTime = compareTime.start.getTime();
          if (currentStartTime === compareStartTime) {
            // 相同的开始时间，冲突
            return `${currentTime.date}的${currentTime.time}已被占用!`;
          } else {
            // 不同的开始时间，比较得出较早的时间段
            let prev, next;
            if (currentStartTime > compareStartTime) {
              prev = compareTime;
              next = currentTime;
            } else {
              prev = currentTime;
              next = compareTime;
            }
            // 更早开始的时间段结束时间大于更晚开始时间段的开始时间，冲突
            if (prev.end > next.start) {
              return `${currentTime.date}的${currentTime.time}已被占用!`;
            }
          }
        }
      }
    }
  }
  return '';
};
