/*  
+---------------------------------------------------+
|Var
+---------------------------------------------------+*/
	var express = require('express');
	var router = express.Router();
  var GeoJSON = require('geojson');
  var postgeo = require("postgeo");
  var js2xmlparser = require("js2xmlparser");


/*  
+---------------------------------------------------+
|Connection
+---------------------------------------------------+*/
	const pg = require('pg');
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:teste@localhost/db_pauliceia';
	const client = new pg.Client(connectionString);
	client.connect();
  
/*  
+---------------------------------------------------+
|Urls
+---------------------------------------------------+*/

/*  
+---------------------------------------------------+
|HomePage
+---------------------------------------------------+*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pauliceia 2.0 WebService' });

});

/*  
+---------------------------------------------------+
|getAllStreets-GeoJson
+---------------------------------------------------+*/

router.get('/getAllStreets/geojson', (req, res, next) => {
const results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street order by id ASC;');
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);
      
      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllStreets-Json
+---------------------------------------------------+*/

router.get('/getAllStreets/json', (req, res, next) => {
const results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street order by id ASC;');
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      return res.json(results);
    });
  });
});

/*  
+---------------------------------------------------+
|getAllStreets-Xml
+---------------------------------------------------+*/

router.get('/getAllStreets/xml', (req, res, next) => {
const results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street order by id ASC;');
    
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      
      const results2 = js2xmlparser.parse("tb_street", results);
      //console.log(results2);

      return res.write(results2);;
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet-Json
+---------------------------------------------------+*/
router.get('/getSingleStreet/json/:street_id', (req, res, next) => {
  
  const results = [];
  const id = req.params.street_id;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      //const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results);
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet-GeoJson
+---------------------------------------------------+*/
router.get('/getSingleStreet/geojson/:street_id', (req, res, next) => {
  
  const results = [];
  const id = req.params.street_id;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = GeoJSON.parse(results, {'MultiLineString': 'geom'});
      //console.log(results2);

      return res.json(results2);
    });
  });
});

/*  
+---------------------------------------------------+
|getSingleStreet-Xml
+---------------------------------------------------+*/
router.get('/getSingleStreet/xml/:street_id', (req, res, next) => {
  
  const results = [];
  const id = req.params.street_id;

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('select * from tb_street where id=($1)',[id]);
    //const query = client.query('select * from tb_street where id=($1)', id);

// Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();

      const results2 = js2xmlparser.parse("tb_street", results);
      //console.log(results2);

      return res.write(results2);;
    });
  });
});


/*  
+---------------------------------------------------+
|consoleLog
+---------------------------------------------------+*/
console.log('Listening on port 3000.');
module.exports = router;
