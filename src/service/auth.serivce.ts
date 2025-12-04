import AuthRepo from "../repo/auth.repo";

class AuthService {
    static async registerService(serviceName: string, callbackUrl: string) {
        return await AuthRepo.createService(serviceName, callbackUrl);
    }
    static async getService(serviceId: number) {
        return await AuthRepo.getServiceById(serviceId);
    }
    static async removeService(serviceId: number) {
        return await AuthRepo.deleteService(serviceId);
    }
    static async modifyService(serviceId: number, serviceName?: string, callbackUrl?: string) {
        return await AuthRepo.updateServiceById(serviceId, serviceName, callbackUrl);
    }
}
export default AuthService;