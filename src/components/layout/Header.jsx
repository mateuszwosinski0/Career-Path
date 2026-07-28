import { Moon, Bell, Search } from 'lucide-react';

function Header() {
return (
    <header className="flex justify-between items-center px-8 py-5 border-b border-gray-200">
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <div className='flex gap-4'>
            <form className="relative">
               <Search size={18}
  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
/>
                <input
  className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-gray-400"
  type="search"
  placeholder="Search..."
/>
            </form>
            <div className="flex items-center gap-2">
            <button type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            aria-label='Toggle dark mode'
            >
                <Moon size={20}/>
            </button>
            <button type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-gray-100"
            aria-label='Notifications'
            >
                <Bell size={20}/>
            </button>
            </div>
        </div>
    </header>
)
}

export default Header;