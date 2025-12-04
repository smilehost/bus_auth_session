import { prismaAuth, prismaMass } from "../util/db";

class AuthRepo {
    static async createService(serviceName: string, callbackUrl: string) {
        return await prismaAuth.service.create({
            data: {
                service_name: serviceName,
                callback_url: callbackUrl
            }
        });
    }
    static async getServiceById(serviceId: number) {
        return await prismaAuth.service.findUnique({
            where: {
                service_id: serviceId
            }
        });
    }
    static async deleteService(serviceId: number) {
        return await prismaAuth.service.delete({
            where: {
                service_id: serviceId
            }
        });
    }
    static async updateServiceById(serviceId: number, serviceName?: string, callbackUrl?: string) {
        return await prismaAuth.service.update({
            where: {
                service_id: serviceId
            },
            data: {
                ...(serviceName !== undefined && { service_name: serviceName }),
                ...(callbackUrl !== undefined && { callback_url: callbackUrl })
            }
        });
    }
}

export default AuthRepo;