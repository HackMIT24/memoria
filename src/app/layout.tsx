import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs'
import './globals.css'
import Navbar from "@/components/Navbar";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
	subsets: ['latin'],
	style: "normal",
	weight: '400',
})

export const metadata = {
	title: "Memoria",
	description: "Memoria is an app to help manage patient's Alzhemier's symptoms."
}


export default function RootLayout({
									   children,
								   }: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={`p-3 ${poppins.className}`}>
					<Navbar />
					<div className="p-3">
						{children}
					</div>
				</body>
			</html>
		</ClerkProvider>
	)
}