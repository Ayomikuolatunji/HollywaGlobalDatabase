import { Error } from "../typings/requestErrorTypings"


export const throwError= (errorMsg:string,statusCode:number) => {
    const error:Error=new Error(errorMsg)
    error.statusCode=statusCode
    throw error
}