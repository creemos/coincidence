import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: "/privacy", label: "Политика конфиденциальности" },
    { href: "/terms", label: "Условия использования" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-muted-foreground text-sm">
              © {currentYear} СвойЧеловек+. Все права защищены.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200"
                data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Additional footer content */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-muted-foreground text-xs">
              Сделано с ❤️ для поиска настоящей любви
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}