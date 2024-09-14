const { Kas } = require("../models");
const { Op } = require("sequelize");

class KasController {
  static async InsertKas(req, res, next) {
    try {
      const { keterangan, tanggal, deskripsi, jumlah } = req.body;
      const createKas = await Kas.create({
        keterangan,
        tanggal,
        deskripsi,
        jumlah,
      });
      res
        .status(201)
        .json({ message: "Kas Berhasil di tambahkan", data: createKas });
    } catch (error) {
      next(error);
    }
  }

  static async getAllKas(req, res, next) {
    try {
      const { startDate, endDate, page = 1, pageSize = 10 } = req.query;

      let queryCondition = {};

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        queryCondition.tanggal = {
          [Op.between]: [start, end],
        };
      } else if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        queryCondition.tanggal = {
          [Op.gte]: start,
        };
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        queryCondition.tanggal = {
          [Op.lte]: end,
        };
      }

      const offset = (page - 1) * pageSize;

      const { rows: kasRecords, count: totalKas } = await Kas.findAndCountAll({
        where: queryCondition,
        order: [["tanggal", "DESC"]], 
        limit: parseInt(pageSize),
        offset: parseInt(offset),
      });

      res.status(200).json({
        data: kasRecords,
        pagination: {
          totalKas,
          totalPages: Math.ceil(totalKas / pageSize), 
          currentPage: parseInt(page),
          pageSize: parseInt(pageSize), 
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async calculateBalance(req, res, next) {
    try {
      // Fetch Pemasukan and Pengeluaran
      const pemasukanData = await Kas.sum("jumlah", {
        where: {
          keterangan: "Pemasukan",
        },
      });

      const pengeluaranData = await Kas.sum("jumlah", {
        where: {
          keterangan: "Pengeluaran",
        },
      });

      const totalPemasukan = pemasukanData || 0;
      const totalPengeluaran = pengeluaranData || 0;
      const balance = totalPemasukan - totalPengeluaran;

      console.log({
        totalPemasukan,
        totalPengeluaran,
        balance,
      });

      // Send response with balance
      res.status(200).json({
        totalPemasukan,
        totalPengeluaran,
        balance,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

module.exports = KasController;
