import express from "express";
import routes from "./routes";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors({
    origin: "*", // url do front
    credentials: false,
    methods: 'GET, PUT, POST, OPTIONS, DELETE, PATCH',
}));

app.use('/', routes);


export default app;

const port = 3000;

app.listen(port, () => {
    console.log(`Server On, Port ${port}`);
});   