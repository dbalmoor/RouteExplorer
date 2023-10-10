const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



const app = express();

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'signup'
})




app.get('/login', (req, res) => {
    return res.json("From Backend");
})
app.get('/signup', (req, res) => {
    return res.json("From Signup");
})
app.get('/routes', (req, res) => {
    return res.json("From Routes");
})
app.get('/getName', (req, res) => {
    return res.json("From gget Name");
})

app.post('/routes', (req, res) => {

  const sql = `SELECT bus_route
                FROM bus_stops_numbers
                WHERE stop_name = ?
                AND bus_route IN (
                SELECT bus_route FROM bus_stops_numbers WHERE stop_name = ? );
              `;
  db.query(sql, [req.body.source, req.body.destination], (err, results) => {
    if (err) {
      console.error('Error fetching routes from the database:', err);
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });
});

app.post('/busRoute', (req, res) => {

  const sql = `SELECT bus_route_via FROM bus_numbers WHERE bus_route = ?;`;
  db.query(sql, [req.body.value], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });
});

app.post('/allRoutes', (req, res) => {

  const sql = `SELECT DISTINCT stop_name FROM bus_stops_numbers ORDER BY stop_name ASC;`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });


});


app.post('/allstops', (req, res) => {

  const sql = `SELECT DISTINCT stop_name FROM bus_stops_numbers ORDER BY stop_name ASC;`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });

  
});

app.post('/allNumbers', (req, res) => {

  const sql = `SELECT DISTINCT bus_route FROM bus_numbers ORDER BY bus_route ASC;`;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });
});

app.post('/getSourceList', (req, res) => {

  const sql = `SELECT stop_name FROM bus_stops_numbers`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching routes from the database:', err);
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const source = results;
      console.log(source);
      res.json(source);
      
    }
  });
});


app.post('/busRoutes', (req, res) => {

  const sql = `SELECT * FROM bus_routes_numbers WHERE bus_route = ?`;
  db.query(sql, [req.body.busRoute], (err, results) => {
    if (err) {
      console.error('Error fetching routes from the database:', err);
      res.status(500).json({ error: 'Error fetching routes' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'No route found for the given source and destination' });
    } else {
      const route = results;
      console.log(route);
      res.json(route);
      
    }
  });
});

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO loginsignup (name, email, password) VALUES ?';
    const values = [
        [req.body.name, req.body.email, req.body.password]
    ];
    
    
    db.query(sql, [values], (err, data) => {
        if(err) {
            return res.json("What Error: " + err.message + values);
        }
        return res.json("Success");
    }) 
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM loginsignup WHERE email = ? AND password = ?';
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if(err) {
            return res.json(err);
        }
        else if(data.length > 0) {
            return res.json("Success");
        }
        else {
            return res.json("Error");
        }
    }) 

})

app.post('/getName', (req, res) => {
    const sql = `SELECT * FROM loginsignup WHERE email = ?;`;
    
    db.query(sql, [req.body.email], (err, data) => {
        if(err) {
            return res.json(err);
        }
        if(data.length > 0) {
            return res.json(data)
        }
        else {
            return res.json("Error");
        }
    }) 

})



app.listen(8081, () => {
    console.log("Listening..");
})