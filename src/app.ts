import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import appRouter from "./routes";
import swaggerOptions from "./config/swagger";

dotenv.config();

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const { APP_PORT } = process.env;

const app = express();

app.disable("x-powered-by");
app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customCss: ".swagger-ui .topbar { display: none }",
        customSiteTitle: "Temperature API Docs",
    })
);
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

app.use("/api", appRouter);

const run = async () => {
    try {
        app.listen(APP_PORT, () => {
            console.log("Started on", APP_PORT);
        });
    } catch (error) {
        console.error(error);
    }
};

run();
