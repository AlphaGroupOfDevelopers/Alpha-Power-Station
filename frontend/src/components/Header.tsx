import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-blue-900">
              Alpha Power Station
            </div>
          </Link>
          <ul className="hidden lg:flex space-x-6 items-center text-sm">
            <li><Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link></li>
            <li><Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About Us</Link></li>
            <li><Link href="/team" className="text-gray-700 hover:text-blue-600 font-medium transition">Our Team</Link></li>
            <li><Link href="/projects" className="text-gray-700 hover:text-blue-600 font-medium transition">Projects</Link></li>
            <li><Link href="/student-programs" className="text-gray-700 hover:text-blue-600 font-medium transition">Student Programs</Link></li>
            <li><Link href="/partnerships" className="text-gray-700 hover:text-blue-600 font-medium transition">Partnerships</Link></li>
            <li><Link href="/news" className="text-gray-700 hover:text-blue-600 font-medium transition">News & Insights</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link></li>
            <li>
              <Link 
                href="/student-programs/apply" 
                className="bg-yellow-400 text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Apply Now
              </Link>
            </li>
          </ul>
          {/* Mobile menu button */}
          <button className="lg:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
