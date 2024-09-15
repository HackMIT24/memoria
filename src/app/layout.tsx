'use client'

import {ClerkProvider, useAuth} from '@clerk/nextjs'
import './globals.css'
import Navbar from "@/components/Navbar";
import {Roboto_Mono} from 'next/font/google';
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";
import React from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);

const robotoMono = Roboto_Mono({
	subsets: ['latin'],
	style: "normal",
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
				<body className={`p-3 ${robotoMono.className}`}>
				<Navbar/>
				<div className="p-3">
					{children}
				</div>
				</body>
				</html>
			</ConvexProviderWithClerk>
		</ClerkProvider>
	)
}