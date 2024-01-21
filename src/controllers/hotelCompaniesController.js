const hotelCompaniesService = require("../services/hotelCompaniesService");

const hotelCompaniesController = {

    /**
     * Creates a new hotel company.
     * @param {Express.Request} req - Express request object containing:
     *   - body: {
     *       name: string,           // Name of the hotel company
     *       location: string,       // Location of the hotel company
     *       type: string,           // Type of the hotel company
     *       hotelier: number,       // ID of the hotelier/user associated with this company
     *       assets: object          // Additional assets or information in JSON format
     *     }
     * @param {Express.Response} res - Express response object
     * @returns Sends a 201 status code and the newly created hotel company object in JSON format
     */
    createCompany: async (req, res) => {
        try {
            const {name, location, description, type, hotelier, assets} = req.body;
            const newCompany = await hotelCompaniesService.createCompany(name, location, description, type, hotelier, assets);
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Updates an existing hotel company.
     * @param {Express.Request} req - Express request object containing:
     *   - params: { id: number },   // ID of the hotel company to be updated
     *   - body: { ... }             // Fields of the hotel company to be updated
     * @param {Express.Response} res - Express response object
     * @returns Sends the updated hotel company object in JSON format
     */
    updateCompany: async (req, res) => {
        try {
            const {id} = req.params;
            const updateData = req.body;
            const updatedCompany = await hotelCompaniesService.updateCompany(parseInt(id), updateData);
            res.json(updatedCompany);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Deletes a hotel company.
     * @param {Express.Request} req - Express request object containing:
     *   - params: { id: number }    // ID of the hotel company to be deleted
     * @param {Express.Response} res - Express response object
     * @returns Sends a 204 status code on successful deletion
     */
    deleteCompany: async (req, res) => {
        try {
            const {id} = req.params;
            await hotelCompaniesService.deleteCompany(parseInt(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Retrieves a hotel company by its ID.
     * @param {Express.Request} req - Express request object containing:
     *   - params: { id: number }    // ID of the hotel company
     * @param {Express.Response} res - Express response object
     * @returns Sends the retrieved hotel company object in JSON format or a 404 status code if not found
     */
    getCompany: async (req, res) => {
        try {
            const {id} = req.params;
            const company = await hotelCompaniesService.getCompany(parseInt(id));
            if (company) {
                res.json(company);
            } else {
                res.status(404).json({message: 'Company not found'});
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Retrieves all hotel companies associated with a given user ID.
     * @param {Express.Request} req - Express request object containing:
     *   - params: { userId: number } - The ID of the user for which hotel companies are to be retrieved.
     * @param {Express.Response} res - Express response object.
     * @returns {void} Responds with an array of hotel company objects or an error message in case of failure.
     */
    getAllCompaniesByUserId: async (req, res) => {
        try {
            const userId = parseInt(req.params.userId);
            const companies = await hotelCompaniesService.getCompaniesByUserId(userId);
            res.json(companies);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
};

module.exports = hotelCompaniesController;
