import { scrypt,randomBytes } from "crypto";
import { promisify } from "util";
const asyncScrypt = promisify(scrypt)
export class Password {
    static async toHash(password:string){
        const salt = randomBytes(8).toString('hex')
        const buf = await asyncScrypt(password,salt,64) as Buffer
        return `${buf.toString('hex')}.${salt}`
    }
    static async comparePassword(storePassword:string,suppliesPassword:string){
        const [hashPassword,salt] = storePassword.split('.')
        const buf = await asyncScrypt(suppliesPassword,salt,64) as Buffer
        return buf.toString('hex')===hashPassword
    }
}