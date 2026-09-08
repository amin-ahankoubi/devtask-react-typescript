interface HeaderProps {
    title : string;
    description : string;
    userName : string;
}

function Header({title , description , userName} : HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Hello {userName}</p>
    </header>
  )
}

export default Header;