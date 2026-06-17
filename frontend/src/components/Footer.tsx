import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">Alpha Power Station</h3>
            <p className="text-gray-400 mb-4">
              Integrated Engineering & Technology Hub for West Africa
            </p>
            <p className="text-sm text-gray-500">
              Building Africa-Proof Engineering solutions
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/team" className="hover:text-white transition">Our Team</Link></li>
              <li><Link href="/projects" className="hover:text-white transition">Projects</Link></li>
              <li><Link href="/student-programs" className="hover:text-white transition">Student Programs</Link></li>
              <li><Link href="/partnerships" className="hover:text-white transition">Partnerships</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Resources</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/news" className="hover:text-white transition">News & Insights</Link></li>
              <li><Link href="/student-programs/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Connect</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>West Africa</li>
              <li><a href="mailto:info@alphapowerstation.org" className="hover:text-white transition">info@alphapowerstation.org</a></li>
              <li className="pt-4">
                <Link 
                  href="/student-programs/apply" 
                  className="inline-block bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm"
                >
                  Apply Now
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Alpha Power Station. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-500">AGD • AGEE</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
