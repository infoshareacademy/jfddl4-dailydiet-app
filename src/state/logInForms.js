import { auth } from "../firebase"

const LOG_IN_BY_EMAIL_AND_PASSWORD = 'logInForms/LOG_IN_BY_EMAIL_AND_PASSWORD'
const SIGN_UP = 'logInForms/SIGN_UP'

export const logInByMailAndPass = (user) => ({ type: LOG_IN_BY_EMAIL_AND_PASSWORD, user})

export const signUp = (user) => ({type: SIGN_UP, user})