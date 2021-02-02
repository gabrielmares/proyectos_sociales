import { useContext } from 'react'
import Header from '../components/privates/Header'
import Sidebar from '../components/privates/Sidebar'
import Calendar from '../components/privates/Calendar'
import { Col, Row } from 'reactstrap'
import { sessionContext } from '../provider/contextGlobal'
import SidebarEventsComponent from '../components/privates/SidebarEventsInfo'
// import GlobalContext from '../provider/contextGlobal'


const MainComponent = (props) => {

    const { sidebar } = useContext(sessionContext)

    return (
        // <GlobalContext>
            <div className="mainCss">
                <Header {...props} />
                <Col lg={12}>
                    <Row >
                        {!sidebar && (<Col lg={3}><Sidebar  {...props} /></Col>)}   
                        <Col lg={!sidebar ? (6) : (9)}  >
                            <Calendar {...props} />

                        </Col>
                        <Col className="sidebarcss" lg={3}>
                            <SidebarEventsComponent  {...props} />
                        </Col>
                    </Row>
                </Col>
            </div>
        // </GlobalContext>
    );
}

export default MainComponent;