function Footer() {
  const links = [
    "Help", "Status", "About", "Careers", "Press", "Blog",
    "Privacy", "Rules", "Terms", "Text to speech"
  ];

  return (
    <footer className="text-sm text-gray-600 px-6 py-4 border-t border-gray-800 flex flex-wrap gap-4 items-center justify-center">
      {links.map(link => (
        <a key={link} href="#" className="hover:underline">
          {link}
        </a>
      ))}
    </footer>
  );
}

export default Footer;
