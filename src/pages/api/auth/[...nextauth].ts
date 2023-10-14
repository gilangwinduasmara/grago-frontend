import { NextApiHandler } from "next"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import Axios, {AxiosError} from "axios";

const options: AuthOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log('authorize', credentials);
                try {
                    const res = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, credentials)
                    const user = await res.data;

                    if (user && user.accessToken) {
                        return {
                            ...user,
                            accessToken: user.accessToken,
                            avatar_url: user.avatar?.url || null,
                        }
                    }
                }catch (e) {
                    if(e instanceof AxiosError) {
                        if(e?.response?.status === 401) {
                            throw new Error('Username atau password salah')
                        }
                        throw new Error(e?.message)
                    }
                    if(e instanceof Error){
                        throw new Error(e?.message)
                    }
                }
                throw new Error('Terjadi kesalahan')
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            // profile(profile) {
            //   return {
            //     ...profile,
            //     test: 'test'
            //   }
            // }
        }),
    ],
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    pages:{
        signIn: '/login',
        newUser: '/register',
        error: '/login',
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if(account?.provider === 'google') {
                const response = await Axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/callback/google`, {
                    ...account
                });
            }
            return true
        },
        async session({ session, token }:any) {
            // console.log(session, token)
            session.user.token = token.accessToken;
            session.user.avatar_url = token.avatar_url;
            // session.user.roles = token.roles;
            return session
        },
        async jwt({ token, user, account, profile }:any) {
            user && (token = user);
            return token;
        },
    }
}

const handler: NextApiHandler = (req, res) => NextAuth(req, res, options)

export default handler
