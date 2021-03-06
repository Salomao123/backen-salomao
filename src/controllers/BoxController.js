const Box = require('../models/Box');

class BoxController {
  async store(req, res) {
    const boxs = await Box.create(req.body);
    return res.json(boxs);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: {sort:{createdAt: -1}}
    });
    return res.json(box);
  }
}

module.exports = new BoxController();