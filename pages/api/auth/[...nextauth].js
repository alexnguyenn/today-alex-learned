import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                password: {  label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {
                const passwordMatched = await bcrypt.compare(credentials.password, process.env.MY_PASSWORD)

                if (passwordMatched) {
                    return { name: "Alex" }
                }
                return null
            }
        })
    ],
    secret: process.env.MY_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 1200,
    },
})