import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-[9999] w-full bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-stone-800 tracking-tight">
                Park Explorer
              </span>
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-emerald-700 font-bold' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Home
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}