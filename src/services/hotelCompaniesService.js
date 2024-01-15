const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();


const hotelCompaniesService = {

    createCompany: async (name, location, type, hotelier, assets) => {
        return prisma.hotelcompanies.create({
            data: {name, location, type, hotelier, assets}
        });
    },

    updateCompany: async (id, updateData) => {
        return prisma.hotelcompanies.update({
            where: {id},
            data: updateData
        });
    },

    deleteCompany: async (id) => {
        await prisma.hotelcompanies.delete({where: {id}});
        return null;
    },

    getCompany: async (id) => {
        return prisma.hotelcompanies.findUnique({where: {id}});
    },

    getCompaniesByUserId: async (userId) => {
        return prisma.hotelcompanies.findMany({where: {hotelier: userId}});
    }

}

module.exports = hotelCompaniesService;
