const express = require('express');
const schema = require('./schema.js');
const { graphql } = require('graphql');
const bodyParser = require('body-parser');
const PORT = 2333;

const app = express();

// 解析post请求为text
app.use(bodyParser.text({ type: 'application/graphql' }));

let query = '{ count }';
// or let query = 'query RootQueryType { count }';

// 模拟请求
graphql(schema, query).then(result => {
  // console.log(result);
});

app.post('/graphql', (req, res) => {
  // 启动GraphQL执行器
  graphql(schema, req.body).then((result) => {
    	res.send(JSON.stringify(result, null, 2));
  	})
});

/* 
	此时发起一个Post请求
	[headers]
		Content-Type:application/graphql
	[body]
		{ count }
	就会收到
	{
	  "data": {
	    "count": 0
	  }
	}

	而请求内容：
	{
	  __schema {		// 每个 GraphQL根域都会自动加上一个__schema域
	    queryType {     // __schema域有一个子域叫 queryType
	      name,
	      fields {
	        name,
	        description
	      }
	    }
	  }
	}
	则会得到
	{
	  "data": {
	    "__schema": {
	      "queryType": {
	        "name": "RootQueryType",
	        "fields": [
	          {
	            "name": "count",
	            "description": "The count!"
	          }
	        ]
	      }
	    }
	  }
	}

	发起请求
	mutation RootMutationType { updateCount }（或者 mutation { updateCount }）
	则会得到
	{
	  "data": {
	    "updateCount": 1
	  }
	}
*/

let server = app.listen(PORT, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('GraphQL listening at http://localhost:%s', port);
});

// http://taobaofed.org/blog/2015/11/26/graphql-basics-server-implementation/
