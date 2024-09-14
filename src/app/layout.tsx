'use client'

import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton, useAuth
} from '@clerk/nextjs'
import './globals.css'
import Navbar from "@/components/Navbar";
import { Poppins } from 'next/font/google';
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const poppins = Poppins({
	subsets: ['latin'],
	style: "normal",
	weight: '400',
})

export default function RootLayout({
									   children,
								   }: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
				<html lang="en">
					<body className={`p-3 ${poppins.className}`}>
						<Navbar />
						<div className="p-3">
							{children}
						</div>
					</body>
				</html>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}