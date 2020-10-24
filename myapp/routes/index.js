var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
// 
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.sendFile(__dirname + '/index.html');
  res.sendFile(process.cwd() + '/views/index.html');
});

router.get('/getData', function(req, res, next) {
  Promise.all([loadFile('categories.csv'), loadFile('bill.csv')]).then(data => {
  	res.json({
  		code: 0,
  		msg: 'success',
  		data: data
  	})
  })
});



// 读取指定文件
function loadFile(name) {
	let file = process.cwd() + '/public/file/' + name 
	return new Promise((resolve, reject) => {
		fs.readFile(file, function (err, data) {
		    var table = new Array();
		    if (err) {
		        reject(err)
		    }
            
		    data = data.toString();
		    // console.log(data)
		    var table = new Array();
		    var rows = new Array();
		    var str = data.split("\r\n")[0];
		    var lines = str.split("\n");
		    var keys = lines[0].split(",")
		    for (var i = 1; i < lines.length; i++) {
		    	console.log(lines[i])
		    	let line = lines[i].split(",")
                let item = {}
		        keys.map((key, index) => {
                  item[key] = line[index]
		        })
		        // console.log(item)
		        table.push(item)
		    }
		    // console.log(table)
		    resolve(table)
		});
	})
}



module.exports = router;
