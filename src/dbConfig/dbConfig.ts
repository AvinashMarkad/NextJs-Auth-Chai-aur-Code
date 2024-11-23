import mongoos from "mongoose";

export async function connect() {
  try {
    await mongoos.connect(process.env.MONGO_URI!);
    const connection = mongoos.connection;

    connection.on("connected", () => {
      console.log("Connected to database");
    });
    connection.on("error", (error) => {
      console.log("Error connecting to database");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database");
    console.log(error);
  }
}
