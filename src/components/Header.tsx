interface HeaderProps {
  title: string;
  description: string;
  userName: string;
}

function Header({
  title,
  description,
  userName
}: HeaderProps) {
  return (
    <header className="mb-8 rounded-2x1 bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        <div>
          <h1 className="text-3x1 font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          <p className="text-sm font-medium text-slate-700">
            {description}
          </p>
        </div>

        <div className="rounded-x1 bg-slate-100 px-4 py-2">
          <p>
            Hello
            {userName}
          </p>
        </div>
        
      </div>
    </header>
  )
}

export default Header;