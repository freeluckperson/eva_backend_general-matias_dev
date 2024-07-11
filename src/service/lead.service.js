import { Lead } from "../models/lead.model.js";

export const listLeads = async () => {
    return await Lead.findAll({
        where: {
            estado: true
        },
        order: [["id_lead", "DESC"]],
    });
}