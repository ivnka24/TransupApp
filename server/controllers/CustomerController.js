const { Customer } = require("../models");
const { Op } = require("sequelize");

class CustomerController {
  static async createCustomers(req, res, next) {
    try {
      const { namaLengkap, alamat, domisili, NIK } = req.body;
      console.log(namaLengkap, "<<");
      const insertCustomer = await Customer.create({
        namaLengkap,
        alamat,
        domisili,
        NIK,
      });
      res.status(201).json({
        message: "Data customer berhasil di tambahkan",
        data: insertCustomer,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAllCustomers(req, res, next) {
    try {
      const { NIK, namaLengkap, page = 1, pageSize = 10 } = req.query;

      let whereCondition = {};
      if (NIK) {
        whereCondition.NIK = {
          [Op.like]: `%${NIK}%`,
        };
      }
      if (namaLengkap) {
        whereCondition.namaLengkap = {
          [Op.iLike]: `%${namaLengkap}%`,
        };
      }

      const limit = parseInt(pageSize);
      const offset = (parseInt(page) - 1) * limit;

      const { count, rows: customers } = await Customer.findAndCountAll({
        where: whereCondition,
        order: [["createdAt", "DESC"]],
        limit: limit,
        offset: offset,
      });
      console.log(customers, "<<<<");

      res.status(200).json({
        totalRecords: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        pageSize: limit,
        customers: customers,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCustomerById(req, res, next) {
    try {
      const { id } = req.params;
      const findCustomerId = await Customer.findByPk(id);
      if (!findCustomerId) throw { name: "NotFound", type: "Customer" };
      res.status(200).json({ data: findCustomerId });
    } catch (error) {
      next(error);
    }
  }

  static async updateCust(req, res, next) {
    try {
      const { id } = req.params;
      const { namaLengkap, alamat, domisili, NIK } = req.body;
      const search = await Customer.findByPk(id);
      if (!search) throw { name: "NotFound", type: "Customer" };
      const [updated] = await Customer.update(
        { namaLengkap, alamat, domisili, NIK },
        { where: { id } }
      );

      if (updated) {
        res
          .status(200)
          .json({ message: `Data customer ${namaLengkap} berhasil di edit` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteCust(req, res, next) {
    try {
      const { id } = req.params;
      let findCust = await Customer.findByPk(id);
      if (!findCust) throw { name: "NotFound", type: "Customer" };
      await Customer.destroy({ where: { id } });
      res.status(200).json({
        message: `Customer dengan nama ${findCust.namaLengkap} berhasil di hapus`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCustomerByNIK(req, res, next) {
    try {
      const { NIK } = req.params;
      const findCustomer = await Customer.findOne({ where: { NIK } });
      if (!findCustomer) throw { name: "NotFound", type: "Customer" };
      res.status(200).json({ data: findCustomer });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = CustomerController;
