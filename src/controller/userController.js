const UserService = require(`../service/userService`);

class UserController {

    async findAll(req, res) {
        const data = await UserService.findAll();
        res.send(data.Items)
    }

    async findByID(req, res) {
        console.log(req.params.Id)
        const data = await UserService.findByID(req.params.Id);
        res.send(data);
    }

    async create(req, res) {
        const data = await UserService.create(req.body);
        console.log("from controller ::" + res.json(data));
    }

    async update(req, res) {
        const data = await UserService.update(req.params.Id, req.body)
        res.json(data)
    }

    async deleteByID(req, res) {
        const data =  await UserService.deleteByID(req.params.Id)
        res.json(data);
    }

}

module.exports = new UserController()