import { useState } from 'react'
import {
    Nav,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    NavbarText,
    NavItem,
    Button,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap'


const HeaderComponent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    return (
        <>
            {/* <Nav className="bg-primary justify-content-between text-white">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mt-2">
                    <DropdownToggle nav caret className="float-left mr-auto text-white">
                        Reportes
                </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem >Mensual</DropdownItem>
                        <DropdownItem >Anual</DropdownItem>
                        <DropdownItem>Por Proyecto</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarText className="my-auto">
                    <h2><b>Proyectos Sociales</b></h2>
                </NavbarText>
                <NavItem className="p-2">
                    <Button color="warning">Cerrar Sesion</Button>
                </NavItem>

            </Nav> */}
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
                                <DropdownMenu>
                                    <DropdownItem >Mensual</DropdownItem>
                                    <DropdownItem >Anual</DropdownItem>
                                    <DropdownItem>Por Proyecto</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="#" className="text-white ml-2 mr-2">Administracion</NavLink>
                            </NavItem>
                            <NavLink href="#" className="text-white">Cerrar sesion</NavLink>
                        </Nav>
                    </Collapse>

                </Navbar>
            </div>
        </>
    );
}

export default HeaderComponent;