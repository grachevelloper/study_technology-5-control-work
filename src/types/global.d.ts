declare global {
    namespace Express {
        interface Request {
            validatedData?: any;
            validatedQuery?: any;
        }
    }
}
export {};
