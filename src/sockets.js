import Schedule from "./models/schedule.model";

export default (io) => {
  io.on("connection", (socket) => {
    const emitSchedules = async () => {
      const schedules = await Schedule.find();
      io.emit("getSche", schedules);
    };
    emitSchedules();
    socket.on("client:sendSchedule", async (data) => {
      const user = (await Schedule.findOne({ email: data.email })) || null;
      if (user === null) {
        const ScheFind = await Schedule.findById(data.id);
        if (ScheFind.status === "AVAILABLE") {
          await Schedule.findByIdAndUpdate(data.id, {
            user: data.user,
            email: data.email,
            status: data.status,
          });
          emitSchedules();
          socket.emit("server:success", {
            success: true,
          });
        } else {
          const error = {
            success: false,
            msg: "Horario no disponible",
          };
          socket.emit("server:error", error);
        }
      } else {
        const msg = {
          success: false,
          msg: "Usuario ya registrado",
        };
        io.emit("server:emailExist", msg);
      }
    });
  });
};
