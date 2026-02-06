import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
	return (
		<section className="bg-background px-5 py-20 text-center md:px-6 md:py-36">
			<div className="container mx-auto max-w-xl">
				<p className="font-body text-[0.6875rem] text-foreground/50 uppercase tracking-[0.2em]">
					Newsletter
				</p>
				<div className="mt-4 space-y-6">
					<h2 className="font-display font-normal text-foreground text-xl tracking-tight md:text-3xl">
						Join SIMPLY KF
					</h2>
					<p className="font-body text-foreground/65 text-sm leading-relaxed">
						Early access to collections and private releases.
					</p>
				</div>

				<form className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-10">
					<Input
						className="h-12 min-h-12 w-full border-border/70 bg-transparent font-body text-foreground placeholder:text-foreground/40 sm:max-w-sm"
						placeholder="Email address"
						type="email"
					/>
					<Button
						className="h-12 min-h-12 w-full sm:w-auto sm:min-w-[120px]"
						type="submit"
					>
						Subscribe
					</Button>
				</form>
			</div>
		</section>
	);
}
