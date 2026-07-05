
const prisma = require("../utils/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try{
        const {
            fullName,
            username,
            email,
            password,
            role,
            phone,
            address,
            city } = req.body;

        const existingUser = await prisma.user.findUnique({
            where:{
                email: email
            }
        });

        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "Email already exists"
            });
        }

        const existingUsername = await prisma.user.findUnique({
        where: {
            username
        }
        });

        if (existingUsername) {
        return res.status(400).json({
        success: false,
        message: "Username already exists"
        });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data: {
            fullName,
            username,
            email,
            password: hashedPassword,
            role,
            phone,
            address,
            city
            }
        });


        // Create response object without password
        const userResponse = {
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            city: user.city,
            createdAt: user.createdAt
        };

        return res.status(201).json({
        success: true,
        message: "User created successfully",
        user : userResponse
        });
 
    }
    catch (error){
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
        where: {
            email
        }
        });

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
        );


        if (!isPasswordMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid email or password"
        });
        }

        console.log("JWT Secret:", process.env.JWT_SECRET);
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        const userResponse = {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        city: user.city,
        createdAt: user.createdAt
        };

        return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: userResponse
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message : error.message
        });
    }

    
};

module.exports ={register, login};