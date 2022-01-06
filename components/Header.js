import { Link } from "@mui/material"

const Header = () => {
    return (
        <header>
            <h1>Today I Learned</h1>
            <p>
                {"Hi there! I am "}
                <a href="https://github.com/alexnguyenn">Alex</a>
                {". This website is where I keep track of all my programming-related notes. "} 
                <Link underline="none" href="https://github.com/alexnguyenn/today-alex-learned">Github</Link>
            </p>
        </header>
    );
};

export default Header;
