import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

const EditorialFooter = () => {
  return (
    <footer data-no-reveal className="bg-foreground text-background">
      <div className="editorial-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">Dresdner Spitzen</h3>
            <p className="editorial-body-sm text-background/60 max-w-xs">
              European lace manufacturer since 1884.&nbsp;
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="editorial-label text-background/40 mb-6">Navigation</p>
            <div className="flex flex-col gap-3">
              <Link to="/" className="editorial-body-sm text-background/70 hover:text-background transition-colors">Home</Link>
              <Link to="/about" className="editorial-body-sm text-background/70 hover:text-background transition-colors">About</Link>
              <Link to="/quote" className="editorial-body-sm text-background/70 hover:text-background transition-colors">Request a Quote</Link>
              <Link to="/jobs" className="editorial-body-sm text-background/70 hover:text-background transition-colors">Careers</Link>
              <Link to="/contact" className="editorial-body-sm text-background/70 hover:text-background transition-colors">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="editorial-label text-background/40 mb-6">Contact</p>
            <div className="flex flex-col gap-3 editorial-body-sm text-background/70">
              <p>Dresden, Germany</p>
              <a className="hover:text-background transition-colors" href="mailto:sales@dresdnerspitzen.com">
                sales@dresdnerspitzen.com
              </a>
              <a href="https://www.instagram.com/dresdnerspitzen"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 hover:text-background transition-colors"
              onClick={(e) => {e.preventDefault();window.open("https://www.instagram.com/dresdnerspitzen", "_blank", "noopener,noreferrer");}}>
                
                <Instagram size={16} /> Instagram
              </a>
            </div>
            <div className="mt-8 flex gap-4">
              <button className="editorial-label text-background/60 hover:text-background transition-colors">DE</button>
              <span className="text-background/30">|</span>
              <button className="editorial-label text-background hover:text-background transition-colors">EN</button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="editorial-body-sm text-background/40">
            © {new Date().getFullYear()} Dresdner Spitzen. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/imprint" className="editorial-body-sm text-background/40 hover:text-background/70 transition-colors">Imprint</Link>
            <Link to="/privacy" className="editorial-body-sm text-background/40 hover:text-background/70 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>);

};

export default EditorialFooter;