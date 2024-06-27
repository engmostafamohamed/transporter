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
            return { message: 'Mover created successfully' };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = MoverController;
//# sourceMappingURL=controller.js.map