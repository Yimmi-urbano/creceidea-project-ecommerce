import ModuleList from "@/ui/installed_modules/ModuleList";

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="text-xl font-bold mb-4 text-white">Módulos instalados</h1>
      <ModuleList />
    </main>
  );
}
