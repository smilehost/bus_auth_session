type data = any;

export default class ResponseFormatter {
  static success(data: data, status = true) {
    return {
      success: status,
      data,
    };
  }
  static pagination(data: data, total: number, limit: number, page: number, status = true) {
    return {
      success: status,
      data,
      meta: {
        total,
        limit,
        page,
        totalpages: Math.ceil(total / limit),
      },
    };
  }
}