import prisma from "@/services/database/db";


export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        
    } catch (error) {
        console.error(error)
        
    }
}
export async function getUserByGoogleId(googleId: string) {
    try {
        return await prisma.user.findUnique({
            where: {
                googleId: googleId
            }
        })

        
    } catch (error) {
        console.error(error)
        
    }
}

export async function createUser(email: string, password_hash: string) {
    return await prisma.user.create({
        data: {
            email: email,
            password_hash: password_hash
        }
    })
}

export async function createGoogleUser(email: string, googleId: string) {
    return await prisma.user.create({
        data: {
            email: email,
            googleId: googleId
        }
    })

}

