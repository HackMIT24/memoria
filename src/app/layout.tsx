import {
	ClerkProvider,
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton
} from '@clerk/nextjs'
import './globals.css'
import Navbar from "@/components/Navbar";

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
				<body>
					<Navbar />
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}