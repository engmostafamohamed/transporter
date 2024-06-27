"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MoverController_1 = __importDefault(require("../controllers/MoverController"));
const ItemController_1 = __importDefault(require("../controllers/ItemController"));
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("../middleware/validate"));
const Router = express_1.default.Router();
Router.post('/addMover', (0, express_validator_1.check)("weightLimit").notEmpty().withMessage("weight limit is required"), (0, express_validator_1.check)("energyPower").notEmpty().withMessage("energy power is required"), (0, express_validator_1.check)("status").notEmpty().withMessage("status is required"), validate_1.default, async (req, res) => {
    try {
        const moverDetails = {
            weightLimit: req.body.weightLimit,
            energyPower: req.body.energyPower,
            status: req.body.status,
        };
        const moverController = new MoverController_1.default();
        const result = await moverController.addMover(moverDetails);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
Router.post('/addItem', (0, express_validator_1.check)("name").notEmpty().withMessage("name is required"), (0, express_validator_1.check)("weight").notEmpty().withMessage("item weight is required"), validate_1.default, async (req, res) => {
    try {
        const itemDetails = {
            name: req.body.name,
            weight: req.body.weight,
        };
        const itemController = new ItemController_1.default();
        const result = await itemController.addItem(itemDetails);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
Router.post('/loadItems', (0, express_validator_1.check)("mover_id").notEmpty().withMessage("mover_id is required"), (0, express_validator_1.check)("item_id").notEmpty().withMessage("item_id weight is required"), validate_1.default, async (req, res) => {
    try {
        const loadDetails = {
            mover_id: req.body.mover_id,
            item_id: req.body.item_id,
        };
        const itemController = new ItemController_1.default();
        const result = await itemController.loadItem(loadDetails);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
Router.post('/startMission', (0, express_validator_1.check)("mover_id").notEmpty().withMessage("mover_id is required"), validate_1.default, async (req, res) => {
    try {
        const missionDetails = {
            mover_id: req.body.mover_id,
        };
        const moverController = new MoverController_1.default();
        const result = await moverController.startMission(missionDetails);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
Router.post('/endMission', (0, express_validator_1.check)("mover_id").notEmpty().withMessage("mover_id is required"), validate_1.default, async (req, res) => {
    try {
        const missionDetails = {
            mover_id: req.body.mover_id,
        };
        const moverController = new MoverController_1.default();
        const result = await moverController.endMission(missionDetails);
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
Router.get('/listItems', async (req, res) => {
    try {
        const itemController = new ItemController_1.default();
        const result = await itemController.listItems();
        return res.status(200).json({
            message: "Items listed successfully",
            data: result
        });
    }
    catch (error) {
        return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
});
exports.default = Router;
//# sourceMappingURL=route.js.map