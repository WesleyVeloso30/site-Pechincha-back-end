import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());


app.use('/', routes);


export default app;

app.listen(3000, () => {
    console.log("Server On, Port 3000");
});   