import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from 'dotenv'

dotenv.config({})




export const register = async (req, res) => {

    const hardcodedPassword = process.env.ADMIN_PASSKEY
    
}
export const login = async (req, res) => {
    
}
export const logout = async (req, res) => {
    
}
export const updateProfile = async (req, res) => {
    
}