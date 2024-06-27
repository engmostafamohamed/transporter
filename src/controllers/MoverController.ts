import { MoverInterface, MissionInterface } from "../interfaces/interface";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();
class MoverController {
    async addMover(moverDetails: MoverInterface): Promise<{ message: string }> {
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
        } catch (error: any) {
            throw error;
        }
    }
    async addItem(itemDetails: MoverInterface): Promise<{ message: string }> {
        try {
            await prisma.mover.create({
                data: {
                    weight_limit: itemDetails.weightLimit,
                    energy_power: itemDetails.energyPower,
                    status: itemDetails.status,
                },
            });
            return { message: "Mover created successfully" };
        } catch (error: any) {
            throw error;
        }
    }
    async startMission(
        missionDetails: MissionInterface
    ): Promise<{ message: string }> {
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
        } catch (error: any) {
            throw error;
        }
    }
    async endMission(missionDetails: MissionInterface): Promise<{ message: string }> {
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
        } catch (error: any) {
            throw error;
        }
    }
}
export default MoverController;
