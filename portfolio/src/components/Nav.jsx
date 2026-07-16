export default function Nav() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 flex items-center justify-center gap-8 p-5 text-white text-xl font-semibold">
      <a href="#about" className="hover:text-gray-300 transition-colors duration-300">About</a>
      <a href="#projects" className="hover:text-gray-300 transition-colors duration-300">Projects</a>
      <a href="#contact" className="hover:text-gray-300 transition-colors duration-300">Contact</a>
    </nav>
  );
}
