import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react'; // Optional: for 3-dot icon

function Appbar({ bulk, create, myblog }: { bulk: boolean, create: boolean, myblog: boolean }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function Logout() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  function back() {
    navigate("/blog");
  }

  function decide() {
    if (bulk) {
      Logout();
    } else {
      back();
    }
  }

  return (
    <div className="flex justify-between items-center w-screen border-b border-gray-400 mb-3 px-4 py-3 md:px-20">
      {/* Logo section */}
      <div className="flex items-center space-x-2">
        <div className="w-7 h-7 rounded-full bg-slate-500 text-white flex items-center justify-center text-md">B</div>
        <Link to="/blog">
          <div className="text-2xl font-extrabold">Blogo</div>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-4">
        {!myblog && (
          <Link to="/userblog" className="text-gray-600 font-light hover:underline">
            My blogs
          </Link>
        )}
        {!create && (
          <button
            onClick={() => navigate("/create")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
          >
            Create
          </button>
        )}
        {bulk ? (
          <button
            onClick={decide}
            className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
          >
            Log out
          </button>
        ) : (
          <button
            onClick={decide}
            className="text-white bg-neutral-600 hover:bg-neutral-800 px-3 py-1 rounded"
          >
            Back
          </button>
        )}
      </div>

      {/* Mobile menu (3-dots button) */}
      <div className="md:hidden relative">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <MoreVertical className="w-6 h-6 text-gray-600" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50 flex flex-col">
            {!myblog && (
              <Link
                to="/userblog"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                My blogs
              </Link>
            )}
            {!create && (
              <button
                onClick={() => {
                  navigate("/create");
                  setMenuOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 text-sm text-left text-gray-700"
              >
                Create
              </button>
            )}
            <button
              onClick={() => {
                decide();
                setMenuOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 text-sm text-left text-gray-700"
            >
              {bulk ? "Log out" : "Back"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appbar;
