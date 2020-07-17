import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import dotenv from 'dotenv'
import R from 'ramda'

export function envParser(...paths: string[]): Record<string, any> {
  const buf = fs.readFileSync(path.join(...paths))
  const config = dotenv.parse(buf)

  return config
}

export function string2number(str?: string): number {
  return R.when(R.is(String), Number, str)
}

export function encryptPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
}
