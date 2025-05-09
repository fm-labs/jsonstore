import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

export const SERVER_PORT = process.env.SERVER_PORT || 3030

/**
 * @type {string}
 * @default "data"
 * @description Path to data directory
 */
export const DATA_DIR = process.env.DATA_DIR || './data'

/**
 * @type {string}
 * @default ""
 * @description MongoDB connection string
 */
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/jsonstore'
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'jsonstore'
