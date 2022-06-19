import React, { useState, createContext, useEffect } from "react"
import axios from 'axios';
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { AnySchema } from "yup";

type User = {
    name: string;
    email: string;
}

type SignInData = {
    email: string;
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (data: SignInData) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<any>()

    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInData) {
        const { token, user }: any = await axios.post('http://localhost:3000/auth/authenticate', {
            email,
            password
        })

        setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 * 60 * 24, // 1 day
        })

        setUser(user)

        Router.push('/home')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}