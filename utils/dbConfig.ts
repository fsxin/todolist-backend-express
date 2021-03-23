// 配置文件
import * as mongoose from 'mongoose';

const DBURL = 'mongodb://127.0.0.1:27017';

mongoose.connect(
  // 连接mongodb
  `${DBURL}/todolist`,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('mongodb连接成功')
);

mongoose.connection.on('error', console.error);

export default mongoose;
