// Create web server
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while trying to read comments');
      return;
    }
    res.send(data);
  });
});

// Add comment
app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while trying to read comments');
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('An error occurred while trying to write comments');
        return;
      }
      res.send('Comment added');
    });
  });
});

// Remove comment
app.delete('/comments/:id', (req, res) => {
  fs.readFile('./comments.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('An error occurred while trying to read comments');
      return;
    }
    const comments = JSON.parse(data);
    const index = comments.findIndex((comment) => comment.id === req.params.id);
    if (index === -1) {
      res.status(404).send('Comment not found');
      return;
    }
    comments.splice(index, 1);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send('An error occurred while trying to write comments');
        return;
      }
      res.send('Comment removed');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});