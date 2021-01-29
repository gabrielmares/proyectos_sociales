import { useState } from 'react'
import {
    Nav,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap'

import { logOut } from '../../firebase/firebase'
import { useHistory } from 'react-router-dom'


const HeaderComponent = () => {

    const history = useHistory();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);

    const closeSession = () => {
        logOut()
        history.push('/');
    }
    return (
        <>

            <div>
                <Navbar className="headercss" expand="md">
                    <NavbarBrand className="text-white mt-2"><h2><strong>Responsabilidad social</strong></h2></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={dropdownOpen} navbar className="mt-4">
                        <Nav className="ml-auto text-white" navbar>
                            <UncontrolledDropdown nav inNavbar className="text-white">
                                <DropdownToggle nav caret className="float-left text-white">
                                    Reportes
                                </DropdownToggle>
                                <DropdownMenu style={{ height: 'fit-content', overflowY: 'hidden' }}>
                                    <DropdownItem >Mensual</DropdownItem>
                                    <DropdownItem >Anual</DropdownItem>
                                    <DropdownItem>Por Proyecto</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="#" className="text-white ml-2 mr-2">Administracion</NavLink>
                            </NavItem>
                            <NavLink
                                className="text-white"
                                style={{ cursor: 'pointer' }}
                                onClick={closeSession}
                            >Cerrar sesion</NavLink>
                        </Nav>
                    </Collapse>

                </Navbar>
            </div>
        </>
    );
}

export default HeaderComponent;