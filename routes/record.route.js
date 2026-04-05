import express from "express";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { createRecord, dashboardData, deleteRecord, getRecords, updateRecord } from "../controller/record.controller.js";

const route = express();


route.post("/create",protect,authorize("admin"),createRecord);
route.get("/",protect,authorize("admin","analyst"),getRecords);
route.get("/dashboard",protect,dashboardData)
route.put("/update/:id",protect,authorize("admin"),updateRecord);
route.delete("delete/:id",protect,authorize("admin"),deleteRecord)

export default route;