import GeneralLayout from "@/layouts/GeneralLayout";

export default function About() {
  return (
    <GeneralLayout>
      <main className="container py-12">
        <section className="space-y-6 max-w-[800px]">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">About AiArtToday</h1>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              AiArtToday is a platform dedicated to showcasing and celebrating the intersection of artificial
              intelligence and artistic creation. We believe in the transformative power of AI to unlock new forms of
              creative expression.
            </p>
            <p className="text-lg text-muted-foreground">
              Our mission is to provide a space where artists, technology enthusiasts, and art lovers can come together
              to explore the possibilities of AI-generated art, share their creations, and participate in a growing
              community of digital creators.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether you're an AI artist, a collector, or simply curious about the future of art, AiArtToday offers a
              platform to discover, create, and connect.
            </p>
          </div>
        </section>
      </main>
    </GeneralLayout>
  );
}
