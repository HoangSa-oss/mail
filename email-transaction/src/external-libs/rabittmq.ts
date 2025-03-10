import amqp from 'amqplib'
import config from '../config'
export const createRabbitChannel = async({ 
    host = config.amqpDefaultHost,
    port = config.amqpDefaultPort,
    user = config.amqpDefaultUser,
    password = config.amqpDefaultPassword}
) => {
    return amqp
    .connect(`amqp://${user}:${password}@${host}:${port}`)
    .then(connect => connect.createChannel());;
}