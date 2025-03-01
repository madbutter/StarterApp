import GeneralLayout from "@/layouts/GeneralLayout";

export default function Spaces() {
  return (
    <GeneralLayout>
      <main className="container py-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">Virtual Art Spaces</h1>
          <p className="text-lg text-muted-foreground">
            Explore curated virtual galleries and exhibition spaces showcasing the best in AI-generated artwork.
            Experience art in immersive digital environments.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for space cards */}
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">Virtual spaces are being constructed...</p>
            </div>
          </div>
        </section>
      </main>
    </GeneralLayout>
  );
}
