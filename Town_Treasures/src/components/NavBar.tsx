
const NavbarComponent:NavBar = () => {  
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/signup">Sign Up</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </nav>
  );
  
}

type NavBarType ={

}

type NavBar = (props: NavBarType) =>React.ReactElement

export default NavbarComponent;
