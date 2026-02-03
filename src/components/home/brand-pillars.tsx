export function BrandPillars() {
	return (
		<section className="bg-ivory py-16 md:py-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3 md:gap-12">
					<div className="space-y-3">
						<h3 className="font-display font-medium text-charcoal text-xl">
							Made in Dubai
						</h3>
						{/* Optional subtle line or decorator could go here */}
					</div>

					<div className="space-y-3">
						<h3 className="font-display font-medium text-charcoal text-xl">
							Timeless Design
						</h3>
					</div>

					<div className="space-y-3">
						<h3 className="font-display font-medium text-charcoal text-xl">
							Exclusively for the UK
						</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
