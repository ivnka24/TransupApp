const { Service, Kendaraan, Kas } = require("../models");
const { Op } = require("sequelize");

class ServiceController {
  static async insertService(req, res, next) {
    try {
      const { idKendaraan, debet, kredit, deskripsi } = req.body;
      const findKendaraan = await Kendaraan.findByPk(idKendaraan);
      if (!findKendaraan) throw { name: "NotFound", type: "Kendaraan" };
      const createService = await Service.create({
        idKendaraan,
        tanggalService: new Date(),
        debet: Number(debet),
        kredit: Number(kredit),
        deskripsi,
      });
      await Kendaraan.update(
        { status: "Service" },
        { where: { id: idKendaraan } }
      );

      res.status(201).json({
        data: createService,
        message: "Service motor berhasil di tambahkan",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateService(req, res, next) {
    try {
      const { id } = req.params;
      const findService = await Service.findByPk(id);
      if (!findService) throw { name: "NotFound", type: "Service" };
      await Service.update(
        { statusService: "Selesai Service" },
        { where: { id: id } }
      );
      await Kendaraan.update(
        { status: "Ready" },
        { where: { id: findService.idKendaraan } }
      );
      let descKas;
      if (findService.debet) {
        descKas = "Pemasukan";
      } else if (findService.kredit) {
        descKas = "Pengeluaran";
      }
      const amount = findService.debet ? findService.debet : findService.kredit;
      await Kas.create({
        keterangan: descKas,
        tanggal: new Date(),
        deskripsi: findService.deskripsi,
        jumlah: amount,
      });
      res.status(200).json({ message: "Update service motor berhasil" });
    } catch (error) {
      next(error);
    }
  }

  static async getService(req, res, next) {
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
        queryCondition.tanggalService = {
          [Op.between]: [start, end],
        };
      } else if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        if (isNaN(start.getTime())) {
          throw new Error("Invalid start date format");
        }
        console.log(`Filtering from ${start}`);
        queryCondition.tanggalService = {
          [Op.gte]: start,
        };
      } else if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        if (isNaN(end.getTime())) {
          throw new Error("Invalid end date format");
        }
        console.log(`Filtering until ${end}`);
        queryCondition.tanggalService = {
          [Op.lte]: end,
        };
      }

      if (filter) {
        queryCondition.statusService = filter;
      }

      const pageNum = parseInt(page, 10);
      const pageSizeNum = parseInt(pageSize, 10);

      if (isNaN(pageNum) || pageNum <= 0)
        throw new Error("Invalid page number");
      if (isNaN(pageSizeNum) || pageSizeNum <= 0)
        throw new Error("Invalid page size");

      const offset = (pageNum - 1) * pageSizeNum;
      const limit = pageSizeNum;

      const { rows: services, count: total } = await Service.findAndCountAll({
        where: queryCondition,
        include: [
          {
            model: Kendaraan,
            attributes: ["id", "jenisKendaraan", "platMotor"],
          },
        ],
        order: [
          ["tanggalService", "DESC"],
          ["createdAt", "DESC"],
        ],
        limit,
        offset,
      });

      const totalPages = Math.ceil(total / limit);

      res.status(200).json({
        data: services,
        pagination: {
          page: pageNum,
          pageSize: pageSizeNum,
          totalPages,
          total,
        },
      });
    } catch (error) {
      console.error("Error fetching services:", error);
      next(error);
    }
  }

  static async getServiceById(req, res, next) {
    try {
      const { id } = req.params;
      const service = await Service.findOne({
        where: { id },
        include: [
          {
            model: Kendaraan,
            attributes: ["id", "jenisKendaraan", "platMotor"],
          },
        ],
      });
      if (!service) throw { name: "NotFound", type: "Service" };
      res.status(200).json({ data: service });
    } catch (error) {
      next(error);
    }
  }

  static async updateKredit(req, res, next) {
    try {
      const { id } = req.params;
      let { kredit = 0, debet = 0 } = req.body;
      if (kredit === "") {
        kredit = 0;
      }

      if (debet === "") {
        debet = 0;
      }

      // Find the service by ID
      const findService = await Service.findByPk(id);
      if (!findService) throw { name: "NotFound", type: "Service" };

      // Update the service
      await Service.update({ kredit, debet }, { where: { id } });

      res.status(200).json({ message: "Update service motor berhasil" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;
