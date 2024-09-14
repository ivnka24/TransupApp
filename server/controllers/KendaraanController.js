const { Op } = require("sequelize");
const { Kendaraan } = require("../models");
class KendaraanController {
  static async insertKendaraan(req, res, next) {
    try {
      const {
        jenisKendaraan,
        platMotor,
        ccKendaraan,
        noRangka,
        noMesin,
        pajak,
        kepemilikan,
      } = req.body;

      const newKendaraan = await Kendaraan.create({
        jenisKendaraan,
        platMotor,
        ccKendaraan,
        noRangka,
        noMesin,
        pajak,
        kepemilikan,
      });
      res.status(201).json({
        data: newKendaraan,
        message: "Data Kendaraan berhasil di tambahkan",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async getKendaraanReady(req, res, next) {
    try {
      res
        .status(200)
        .json(await Kendaraan.findAll({ where: { status: "Ready" } }));
    } catch (error) {
      next(error);
    }
  }
  static async getIdKendaraan(req, res, next) {
    try {
      const { id } = req.params;
      const findKendaraan = await Kendaraan.findByPk(id);
      if (!findKendaraan) throw { name: "NotFound", type: "Aset Kendaraan" };
      res.status(200).json({ data: findKendaraan });
    } catch (error) {
      next(error);
    }
  }
  static async getAllKendaraan(req, res, next) {
    try {
      let { page = 1, pageSize = 10, filter = "" } = req.query;

      const offset = (parseInt(page) - 1) * parseInt(pageSize);
      const limit = parseInt(pageSize);
      console.log(limit);
      

      const whereCondition = filter
        ? { status: filter }
        : {};

      console.log(whereCondition, "<<<");

      const { rows: kendaraan, count: total } = await Kendaraan.findAndCountAll(
        {
          where: whereCondition,
          limit,
          offset,
        }
      );

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        data: kendaraan,
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize),
          totalPages,
          total,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateKendaraan(req, res, next) {
    try {
      const { id } = req.params;
      const {
        jenisKendaraan,
        platMotor,
        ccKendaraan,
        noRangka,
        noMesin,
        pajak,
        kepemilikan,
      } = req.body;
      const findKendaraan = await Kendaraan.findByPk(id);
      if (!findKendaraan) throw { name: "NotFound", type: "Aset Kendaraan" };
      const [updated] = await Kendaraan.update(
        {
          jenisKendaraan,
          platMotor,
          ccKendaraan,
          noRangka,
          noMesin,
          pajak,
          kepemilikan,
        },
        { where: { id } }
      );
      if (updated) {
        res.status(200).json({
          message: `Aset kendaraan ${findKendaraan.jenisKendaraan} berhasil di update`,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async deleteKendaraan(req, res, next) {
    try {
      const { id } = req.params;
      let find = await Kendaraan.findByPk(id);
      if (!find) throw { name: "NotFound", type: "Aset Kendaraan" };
      await Kendaraan.destroy({ where: { id } });
      res.status(200).json({
        message: `Aset Kendaraan ${find.jenisKendaraan} berhasil di hapus`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KendaraanController;
