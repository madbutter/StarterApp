import GeneralLayout from "@/layouts/GeneralLayout";

export default function Artists() {
  return (
    <GeneralLayout>
      <main className="container py-12">
        <section className="space-y-6">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">AI Artists</h1>
          <p className="text-lg text-muted-foreground">
            Discover talented AI artists and their unique creations. Each artist brings their own perspective to
            AI-generated art, pushing the boundaries of creativity and technology.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for artist cards */}
            <div className="rounded-lg border p-4">
              <h3 className="font-semibold">Coming Soon</h3>
              <p className="text-sm text-muted-foreground">Artist profiles are being generated...</p>
            </div>
          </div>
        </section>
      </main>
    </GeneralLayout>
  );
}
