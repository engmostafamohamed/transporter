import express, { Request, Response } from 'express';
import Mover_controller from '../controllers/MoverController';
import Item_Controller from '../controllers/ItemController';
import { check } from "express-validator";
import validate from '../middleware/validate';
import { ItemInterface, MoverInterface ,LoadInterface, MissionInterface } from "../interfaces/interface";
const Router = express.Router()

Router.post('/addMover',
    check("weightLimit").notEmpty().withMessage("weight limit is required"),
    check("energyPower").notEmpty().withMessage("energy power is required"),
    check("status").notEmpty().withMessage("status is required"),
    validate,
    async (req: Request, res: Response) => {
        try {
            const moverDetails:MoverInterface={
                weightLimit:req.body.weightLimit,
                energyPower:req.body.energyPower,
                status:req.body.status,
            }
            const moverController=new Mover_controller();
            const result = await moverController.addMover(moverDetails);
            return res.status(200).json(result);
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);

Router.post('/addItem',
    check("name").notEmpty().withMessage("name is required"),
    check("weight").notEmpty().withMessage("item weight is required"),
    validate,
    async (req: Request, res: Response) => {
        try {
            const itemDetails:ItemInterface={
                name:req.body.name,
                weight:req.body.weight,
            }
            const itemController=new Item_Controller();
            const result = await itemController.addItem(itemDetails);
            return res.status(200).json(result);
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);

Router.post('/loadItems',
    check("mover_id").notEmpty().withMessage("mover_id is required"),
    check("item_id").notEmpty().withMessage("item_id weight is required"),
    validate,
    async (req: Request, res: Response) => {
        try {
            const loadDetails:LoadInterface={
                mover_id:req.body.mover_id,
                item_id:req.body.item_id,
            }
            const itemController=new Item_Controller();
            const result = await itemController.loadItem(loadDetails);
            return res.status(200).json(result);
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);
Router.post('/startMission',
    check("mover_id").notEmpty().withMessage("mover_id is required"),
    validate,
    async (req: Request, res: Response) => {
        try {
            const missionDetails:MissionInterface={
                mover_id:req.body.mover_id,
            }
            const moverController=new Mover_controller();
            const result = await moverController.startMission(missionDetails);
            return res.status(200).json(result);
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);
Router.post('/endMission',
    check("mover_id").notEmpty().withMessage("mover_id is required"),
    validate,
    async (req: Request, res: Response) => {
        try {
            const missionDetails:MissionInterface={
                mover_id:req.body.mover_id,
            }
            const moverController=new Mover_controller();
            const result = await moverController.endMission(missionDetails);
            return res.status(200).json(result);
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);
Router.get('/listItems',
    async (req: Request, res: Response) => {
        try {
            const itemController=new Item_Controller();
            const result = await itemController.listItems();
            return res.status(200).json({
                message:"Items listed successfully",
                data:result
            });
        } catch (error:any) {
            return res.status(error.status||500).json({message:error.message||'Internal server error'});
        }
    }
);
export default Router;