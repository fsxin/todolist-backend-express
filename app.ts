import * as express from 'express'; // 引入express模块
import * as cors from 'cors'; // 引入cors模块
import routes from './routes'; //导入自定义路由文件，创建模块化路由
const app = express();

app.use(express.urlencoded({ extended: false }));// 解析form表单提交的数据application/x-www-form-urlencoded 
app.use(express.json()); // 解析json数据格式

app.use(cors()); // 注入cors模块解决跨域

app.use('/', routes);

app.listen(8088, () => {
  // 监听8088端口
  console.log('服务已启动 http://localhost:8088');
});
