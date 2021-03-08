const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors())

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect('mongodb+srv://salomao:Q13HToDkCfiHcJj7@cluster0.pbcz5.mongodb.net/omnistack?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(3000 || process.env.PORT);

