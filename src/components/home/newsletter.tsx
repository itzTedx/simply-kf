import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
	return (
		<section className="bg-ivory py-24">
			<div className="container mx-auto px-4 md:px-6">
				<div className="mx-auto flex max-w-xl flex-col items-center space-y-8 text-center">
					<div className="space-y-2">
						<h2 className="font-display font-medium text-3xl text-charcoal">
							Join SIMPLY KF
						</h2>
						<p className="font-body text-charcoal/60">
							Early access to collections & private releases.
						</p>
					</div>

					<form className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
						<Input
							className="h-11 border-border/60 bg-white font-body text-charcoal placeholder:text-charcoal/40 focus-visible:ring-charcoal/10"
							placeholder="Email address"
							type="email"
						/>
						<Button
							className="h-11 min-w-[120px] bg-charcoal text-white hover:bg-charcoal/90"
							type="submit"
						>
							Subscribe
						</Button>
					</form>
				</div>
			</div>
		</section>
	);
}
