"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { SignInButton } from "@clerk/clerk-react";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react"
import { Loading } from "@/components/auth/loading"


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Unauthenticated>
                    <div className="flex items-center justify-center h-full">
                        <SignInButton />
                    </div>
                </Unauthenticated>
                <Authenticated>
                    {children}   
                </Authenticated>
                <AuthLoading>
                    <Loading></Loading>
                </AuthLoading>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}