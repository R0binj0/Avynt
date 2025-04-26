"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { SignInButton } from "@clerk/clerk-react";
import { AuthLoading, Authenticated, ConvexReactClient, Unauthenticated } from "convex/react"
import { Loading } from "@/components/auth/loading"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {

    const router = useRouter()

    return (
        <ClerkProvider>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <Unauthenticated>
                    <div className="flex flex-col items-center justify-center h-full">
                        <SignInButton />
                        <Button className="pt-20" variant={"secondary"} onClick={() => router.push('/landingpage')}> Landing Page </Button>
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