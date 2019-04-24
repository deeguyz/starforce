const express = require('express');
const path = require('path');
const morgan = require("morgan");
const cors = require('cors');

const app = express();

app.use(morgan("tiny")); // logging framework
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'qwerty123',
//   database : 'starforce'
// });

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected...')
// });

const pg = require('pg');
// const config = {
// 	user: 'daniel',
// 	database: 'starforce',
// 	password: 'qwerty123',
// 	port: 5432
// };

const connectionString = process.env.DATABASE_URL || 'postgresql://daniel:qwerty123@localhost:5432/starforce';

const config = {
	connectionString: connectionString
};

const pool = new pg.Pool(config);





app.get('/api/armor', function(req,response) {
	console.log(req.query);
	// const sql = 'SELECT ? + SUM(Armor.primary) as `primary`, ? + SUM(Armor.secondary) as `secondary`, ? + SUM(Armor.att + Armor.extraAtt) as `ATT` FROM Armor WHERE stars<=? AND isSuperior=? AND ? BETWEEN minLv AND maxLv';
	// connection.query(sql,[ req.query.basePrimary, req.query.baseSecondary, req.query.baseAtk, req.query.stars, req.query.isSup, req.query.itemLevels], function(error, results) {
	// 	if( error) {
	// 		response.status(400).send('Error in database operation');
	// 	} else {
	// 		response.send(results)
	// 	}
	// });

	pool.connect(function (err, client, done) {
		if(err) {
			console.log('err=', err);
		}
		const sql = 'SELECT $1 + SUM(Armor.primary) as primary, $2 + SUM(Armor.secondary) as secondary, $3 + SUM(Armor.att + Armor.extraAtt) as ATT FROM Armor WHERE stars<=$4 AND isSuperior=false AND $5 BETWEEN minLv AND maxLv';
		client.query(sql,[ req.query.basePrimary, req.query.baseSecondary, req.query.baseAtk, req.query.stars, req.query.itemLevels], function (err, result) {
			done();
			if(err) {
				response.status(400).send(err);
			}
			response.send(result.rows);
		})
	})
});

app.get('/api/superior', function(req,response) {
	pool.connect(function (err, client, done) {
		if(err) {
			console.log('err=', err);
		}
		const sql = 'SELECT $1 + SUM(Armor.primary) as primary, $2 + SUM(Armor.secondary) as secondary, $3 + SUM(Armor.att + Armor.extraAtt) as ATT FROM Armor WHERE stars<=$4 AND isSuperior=true AND $5 BETWEEN minLv AND maxLv';
		client.query(sql,[ req.query.basePrimary, req.query.baseSecondary, req.query.baseAtk, req.query.stars, req.query.itemLevels], function (err, result) {
			done();
			if(err) {
				response.status(400).send(err);
			}
			response.send(result.rows);
		})
	})
});

app.get('/api/gloves', function(req,response) {
	pool.connect(function (err, client, done) {
		if(err) {
			console.log('err=', err);
		}
		const sql = 'SELECT $1 + SUM(Gloves.primary) as primary, $2 + SUM(Gloves.secondary) as secondary, $3 + SUM(Gloves.att + Gloves.extraAtt) as ATT FROM Gloves WHERE stars<=$4 AND $5 BETWEEN minLv AND maxLv';
		client.query(sql,[ req.query.basePrimary, req.query.baseSecondary, req.query.baseAtk, req.query.stars, req.query.itemLevels], function (err, result) {
			done();
			if(err) {
				response.status(400).send(err);
			}
			response.send(result.rows);
		})
	})
});

app.get('/api/shoes', function(req,response) {
	pool.connect(function (err, client, done) {
		if(err) {
			console.log('err=', err);
		}
		const sql = 'SELECT $1 + SUM(Shoes.primary) as primary, $2 + SUM(Shoes.secondary) as secondary, $3 + SUM(Shoes.att + Shoes.extraAtt) as ATT, SUM(Shoes.jump) as Jump, SUM(Shoes.speed) as Speed FROM Shoes WHERE stars<=$4 AND $5 BETWEEN minLv AND maxLv';
		client.query(sql,[ req.query.basePrimary, req.query.baseSecondary, req.query.baseAtk, req.query.stars, req.query.itemLevels], function (err, result) {
			done();
			if(err) {
				response.status(400).send(err);
			}
			response.send(result.rows);
		})
	})
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));