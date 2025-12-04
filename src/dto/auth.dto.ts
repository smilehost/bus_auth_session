import z from "zod";

// GET /redirect
export const RedirectReq = z.object({
    query:z.object({
        from:z.coerce.number(),
        callback:z.url(),
        state:z.string()
    })
}).transform(req=>({
    serviceID:req.query.from,
    callback:req.query.callback,
    state:req.query.state
}))

export type RedirectRes = {
    code?: string;
    state: string;
}

// POST /login
export const LoginReq = z.object({
    body: z.object({
        callback: z.url(),
        from: z.coerce.number(),
        state: z.string(),
        username: z.string(),
        password: z.string()
    })
}).transform(req => ({
    callback: req.body.callback,
    serviceID: req.body.from,
    state: req.body.state,
    username: req.body.username,
    password: req.body.password
}))

export type LoginRes = {
    redirectUrl: string;
}

// POST /token
export const TokenReq = z.object({
    body: z.object({
        from: z.coerce.number(),
        code: z.string()
    })
}).transform(req => ({
    serviceID: req.body.from,
    code: req.body.code
}))

export type TokenRes = {
    success: boolean;
    message: string;
}
