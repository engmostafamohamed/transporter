"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = new client_1.PrismaClient();
class MoverController {
    async addMover(moverDetails) {
        try {
            const mover = await prisma.mover.create({
                data: {
                    weight_limit: moverDetails.weightLimit,
                    energy_power: moverDetails.energyPower,
                    status: moverDetails.status,
                },
            });
            console.log(mover);
            return { message: "Mover created successfully" };
        }
        catch (error) {
            throw error;
        }
    }
    async addItem(itemDetails) {
        try {
            await prisma.mover.create({
                data: {
                    weight_limit: itemDetails.weightLimit,
                    energy_power: itemDetails.energyPower,
                    status: itemDetails.status,
                },
            });
            return { message: "Mover created successfully" };
        }
        catch (error) {
            throw error;
        }
    }
    async startMission(missionDetails) {
        try {
            await prisma.mover.update({
                where: {
                    id: missionDetails.mover_id,
                },
                data: {
                    status: "on a mission",
                },
            });
            return { message: "on a mission" };
        }
        catch (error) {
            throw error;
        }
    }
    async endMission(missionDetails) {
        try {
            await prisma.mover.update({
                where: {
                    id: missionDetails.mover_id,
                },
                data: {
                    status: "mission done",
                },
            });
            return { message: "mission complete" };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = MoverController;
//# sourceMappingURL=MoverController.js.map