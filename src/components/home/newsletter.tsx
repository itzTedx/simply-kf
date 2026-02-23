import {
	InputGroup,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";

export function Newsletter() {
	return (
		<section className="border-y bg-ivory py-12 md:py-20">
			<div className="container flex max-w-6xl items-center justify-between">
				<div>
					<p className="font-body text-foreground/50 text-sm uppercase tracking-[0.2em]">
						Newsletter
					</p>

					<h2 className="font-display font-normal text-2xl text-foreground tracking-tight md:text-3xl">
						Join SIMPLY KF
					</h2>
					<p className="font-body text-muted-foreground leading-relaxed">
						Early access to collections and private releases.
					</p>
				</div>

				<form className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
					<InputGroup className="h-12 min-h-12">
						<InputGroupInput
							className="font-body text-foreground placeholder:text-foreground/40 sm:max-w-sm"
							placeholder="Email address"
							type="email"
						/>
						<InputGroupButton
							className="h-10 min-h-10 w-full px-4 sm:w-auto"
							type="submit"
							variant="default"
						>
							Subscribe
						</InputGroupButton>
					</InputGroup>
				</form>
			</div>
		</section>
	);
}
