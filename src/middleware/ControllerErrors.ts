export interface ControllerErrors {
    name: string;
    errors: { message: string; }[]
    message: string
    statusCode: number
}