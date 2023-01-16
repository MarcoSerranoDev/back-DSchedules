import axios from "axios";
import Schedule from "./models/schedule.model";

export default (io) => {
  io.on("connection", (socket) => {
    const emitSchedules = async () => {
      const schedules = await Schedule.find();
      io.emit("getSche", schedules);
    };
    emitSchedules();
    socket.on("client:emailExist", async (data) => {
      const user = await Schedule.findOne({ email: data.email });
      if (user !== null) {
        const response = {
          success: false,
          msg: "Usuario registrado",
        };
        socket.emit("server:emailExistRes", response);
      } else {
        const response = {
          success: true,
          msg: "",
        };
        socket.emit("server:emailExistResOk", response);
      }
    });
    socket.on("client:sendSchedule", async (data) => {
      const ScheFind = await Schedule.findById(data.id);
      if (ScheFind.status === "AVAILABLE") {
        axios
          .post(
            "https://back-wguitar-production.up.railway.app/api/v1/user/sendMailDJ",
            {
              name: data.user,
              email: data.email,
              horario: data.horario,
            }
          )
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
        await Schedule.findByIdAndUpdate(data.id, {
          user: data.user,
          email: data.email,
          status: data.status,
        });
        emitSchedules();
        socket.emit("server:success", {
          success: true,
          msg: "",
        });
      } else {
        const error = {
          success: false,
          msg: "Horario no disponible",
        };
        socket.emit("server:error", error);
      }
    });
  });
};
