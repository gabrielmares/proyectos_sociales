import { useState } from 'react'
import { Nav, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, NavbarText, NavItem, Button } from 'reactstrap'


const HeaderComponent = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(!dropdownOpen);
    return (
        <Nav className="headercss justify-content-between text-white">
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

        </Nav>
    );
}

export default HeaderComponent;