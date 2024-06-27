"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const prisma = new client_1.PrismaClient();
class ItemController {
    async addItem(itemDetails) {
        try {
            await prisma.item.create({
                data: {
                    name: itemDetails.name,
                    weight: itemDetails.weight,
                },
            });
            return { message: "item created successfully" };
        }
        catch (error) {
            throw error;
        }
    }
    async loadItem(loadDetails) {
        try {
            await prisma.$transaction(async (tx) => {
                // Update the post
                const item = await tx.item.update({
                    where: {
                        id: loadDetails.item_id,
                    },
                    data: {
                        mover_id: loadDetails.mover_id,
                    },
                });
                // Update the user's status
                const mover = await tx.mover.update({
                    where: {
                        id: loadDetails.mover_id,
                    },
                    data: {
                        status: "loading",
                    },
                });
                // check item weight lower than weight limit  
                const sumWeight = await prisma.item.aggregate({
                    where: {
                        mover_id: loadDetails.mover_id,
                    },
                    _sum: {
                        weight: true,
                    },
                });
                if (sumWeight._sum.weight != null) {
                    if ((mover.weight_limit) - (sumWeight._sum.weight) < 0) {
                        throw new Error("Weight upper limit.");
                    }
                }
                else {
                    throw new Error("error happend.");
                }
            });
            return { message: "loading" };
        }
        catch (error) {
            throw error;
        }
    }
    async listItems() {
        try {
            const items = await prisma.item.findMany({
                where: {
                    mover: {
                        status: {
                            equals: "mission done"
                        }
                    }
                }
            });
            return items;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = ItemController;
//# sourceMappingURL=ItemController.js.map