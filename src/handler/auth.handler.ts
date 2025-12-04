import type { Request, Response } from "express";
import AuthService from "../service/auth.serivce";
import ResponseFormatter from "../util/response";

class AuthHandler {
    static async registerService(req: Request, res: Response) {
        const { serviceName, callbackUrl } = req.body;
        const result = await AuthService.registerService(serviceName, callbackUrl);
        res.json(ResponseFormatter.success(result));
    }
    static async getService(req: Request, res: Response) {
        const serviceId = Number(req.params.serviceId);
        const result = await AuthService.getService(serviceId);
        res.json(ResponseFormatter.success(result));
    }
}

export default AuthHandler;