import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8 md:py-16">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
				{/* Image Gallery Skeleton */}
				<div className="space-y-4">
					<Skeleton className="aspect-3/4 w-full rounded-sm" />
					<div className="grid grid-cols-4 gap-4">
						<Skeleton className="aspect-3/4 w-full rounded-sm" />
						<Skeleton className="aspect-3/4 w-full rounded-sm" />
						<Skeleton className="aspect-3/4 w-full rounded-sm" />
					</div>
				</div>

				{/* Product Info Skeleton */}
				<div className="space-y-8">
					<div className="space-y-4">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-12 w-3/4" />
						<Skeleton className="h-6 w-24" />
					</div>

					<Skeleton className="h-24 w-full" />

					<div className="space-y-6">
						<div className="space-y-2">
							<Skeleton className="h-4 w-16" />
							<div className="flex gap-2">
								<Skeleton className="h-10 w-12" />
								<Skeleton className="h-10 w-12" />
								<Skeleton className="h-10 w-12" />
								<Skeleton className="h-10 w-12" />
							</div>
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-16" />
							<div className="flex gap-2">
								<Skeleton className="h-8 w-8 rounded-full" />
								<Skeleton className="h-8 w-8 rounded-full" />
							</div>
						</div>
					</div>

					<div className="pt-6">
						<Skeleton className="h-12 w-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
