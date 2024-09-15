export default function SecretsLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-screen">
			<div className="flex-grow">
				{children}
			</div>
		</div>
	);
}