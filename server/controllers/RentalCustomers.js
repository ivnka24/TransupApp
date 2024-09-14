const { Sewa, Customer, Kendaraan, Kas } = require("../models");
const { Op } = require("sequelize");
class SewaController {
  static async insertSewa(req, res, next) {
    try {
      const { idCustomer, idKendaraan, hargaSewa, tanggalKembali, tujuan } =
        req.body;
      console.log(idCustomer, "<<<<");

      const now = new Date();

      const findCustomer = await Customer.findByPk(idCustomer);
      console.log(findCustomer, "<<< findCustomer");
      const sekarang = now.toISOString().split("T")[0];
      if (!findCustomer) {
        throw { name: "NotFound", type: "Customer" };
      }
      const findKendaraan = await Kendaraan.findByPk(idKendaraan);
      if (!findKendaraan) {
        throw { name: "NotFound", type: "Kendaraan" };
      }
      console.log(sekarang, "<< tanggalan");
      const createSewa = await Sewa.create({
        idCustomer,
        idKendaraan,
        hargaSewa,
        tanggalKembali,
        tujuan,
        tanggalSewa: now,
        status: "BELUM SELESAI",
      });
      const updateStatusKendaraan = await Kendaraan.update(
        { status: "No Ready" },
        { where: { id: idKendaraan } }
      );
      res.status(201).json({
        data: createSewa,
        message: "Sewa berhasil di tambahkan",
      });
    } catch (error) {
      console.log(error, "<<<<");
      next(error);
    }
  }
  static async updateTanggalKembali(req, res, next) {
    try {
      const { id } = req.params;
      const { tanggalKembali } = req.body;
      const findSewa = await Sewa.findByPk(id);
      if (!findSewa) throw { name: "NotFound", type: "Sewa" };
      const update = await Sewa.update({ tanggalKembali }, { where: { id } });
      res.status(200).json({ message: "Tanggal kembali berhasil di update" });
    } catch (error) {
      next(error);
    }
  }
  static async updateSelesaiSewa(req, res, next) {
    try {
      const { id } = req.params;
      const findSewa = await Sewa.findByPk(id);
      if (!findSewa) throw { name: "NotFound", type: "Sewa" };
      const updateSelesai = await Sewa.update(
        { status: "SELESAI" },
        { where: { id } }
      );
      const updateMotor = await Kendaraan.update(
        { status: "Ready" },
        { where: { id: findSewa.idKendaraan } }
      );
      const insertKas = await Kas.create({
        keterangan: "Pemasukan",
        tanggal: new Date(),
        deskripsi: "Sewa Motor",
        jumlah: findSewa.hargaSewa,
      });
      res.status(200).json({ message: "Sewa telah selesai" });
    } catch (error) {
      next(error);
    }
  }
  static async getAllSewa(req, res, next) {
    try {
      const { startDate, endDate, filter, page = 1, pageSize = 10 } = req.query;

      let queryCondition = {};

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          throw new Error("Invalid date format");
        }
        console.log(`Filtering between ${start} and ${end}`);
        queryCondition.tanggalSewa = {
          [Op.between]: [start, end],
        };
      } else if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        if (isNaN(start.getTime())) {
          throw new Error("Invalid start date format");
        }
        console.log(`Filtering from ${start}`);
        queryCondition.tanggalSewa = {
          [Op.gte]: start,
        };
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        if (isNaN(end.getTime())) {
          throw new Error("Invalid end date format");
        }
        console.log(`Filtering until ${end}`);
        queryCondition.tanggalSewa = {
          [Op.lte]: end,
        };
      }

      if (filter) {
        queryCondition.status = filter;
      }

      const pageNum = parseInt(page, 10);
      const pageSizeNum = parseInt(pageSize, 10);

      if (isNaN(pageNum) || pageNum <= 0)
        throw new Error("Invalid page number");
      if (isNaN(pageSizeNum) || pageSizeNum <= 0)
        throw new Error("Invalid page size");

      const offset = (pageNum - 1) * pageSizeNum;
      const limit = pageSizeNum;

      const { rows: sewas, count: total } = await Sewa.findAndCountAll({
        where: queryCondition,
        include: [
          {
            model: Customer,
            attributes: ["id", "namaLengkap", "NIK"],
          },
          {
            model: Kendaraan,
            attributes: ["id", "jenisKendaraan", "platMotor"],
          },
        ],
        order: [
          ["tanggalSewa", "DESC"],
          ["createdAt", "DESC"],
        ],
        limit,
        offset,
      });

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        data: sewas,
        pagination: {
          page: pageNum,
          pageSize: pageSizeNum,
          totalPages,
          total,
        },
      });
    } catch (error) {
      console.error("Error fetching sewa:", error);
      next(error);
    }
  }
}

module.exports = SewaController;
