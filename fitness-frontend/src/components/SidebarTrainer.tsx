import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logobanner.png';

const SidebarContainer = styled.aside<{ open: boolean }>`
    background-color: #111827;
    color: white;
    padding: ${(props) => (props.open ? '2rem 1rem' : '2rem 0.5rem')};
    width: ${(props) => (props.open ? '250px' : '80px')};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
`;

const LogoWrapper = styled.div<{ open: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: ${(props) => (props.open ? '200px' : '0px')};
    opacity: ${(props) => (props.open ? 1 : 0)};
    visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
    overflow: hidden;
    transition: all 0.3s ease;
    margin-bottom: ${(props) => (props.open ? '2rem' : '0')};
`;

const LogoImage = styled.img`
    width: auto;
    height: 200px;
    margin: 0 auto 2rem auto;
    display: block;
    object-fit: fill;
    transition: all 0.3s ease;
    transform: translateX(-125px);
`;



const Nav = styled.nav<{ open: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-left: 10px;
    margin-top: -100px;

    a {
        font-size: 1.2rem;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
            text-decoration: underline;
        }

        ${(props) =>
    !props.open &&
    `
            font-size: 0;
            opacity: 0;
            visibility: hidden;
        `}
    }
`;

const SidebarFooter = styled.div`
    border-top: 1px solid #374151;
    padding-top: 1.5rem;
    margin-top: 2rem;
    text-align: center;

    a {
        font-size: 1.1rem;
        color: white;
        text-decoration: none;
    }
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 1rem;
    right: -40px;
    background-color: #111827;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    z-index: 10;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
`;

export default function SidebarTrainer() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <SidebarContainer open={sidebarOpen}>
            <LogoWrapper open={sidebarOpen}>
                <LogoImage src={Logo} />
            </LogoWrapper>

            <ToggleButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? 'Hide' : 'Show'}
            </ToggleButton>

            <Nav open={sidebarOpen}>
                <Link to="/main-trainer">Home</Link>
                <Link to="/view-classes-trainer">View Classes</Link>
                <Link to="/view-schedule-trainer">View Schedule</Link>
                <Link to="/add-class">Add Class</Link>
            </Nav>

            <SidebarFooter>
                <a href="#" onClick={handleLogout}>
                    Logout
                </a>
            </SidebarFooter>
        </SidebarContainer>
    );
}
