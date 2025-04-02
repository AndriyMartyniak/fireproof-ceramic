import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/"><h1 className="text-2xl font-semibold text-gray-900 cursor-pointer">Термо Кераміка</h1></a>
        <NavMenu />
      </div>
    </header>
  );
}