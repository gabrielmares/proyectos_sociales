import { useContext } from 'react'
import Header from '../components/privates/Header'
// import Sidebar from '../components/privates/Sidebar'
import Calendar from '../components/privates/Calendar'
import SidebarFlex from '../components/privates/SidebarFlex'
import { Col, Row } from 'reactstrap'
import { sessionContext } from '../provider/contextGlobal'
import SidebarEventsComponent from '../components/privates/SidebarEventsInfo'


const MainComponent = (props) => {

    const { sidebar } = useContext(sessionContext)

    return (
            <div className="mainCss">
                <Header {...props} />
                <Col >
                    <Row lg={12}>
                        {!sidebar && (<Col lg={3}><SidebarFlex  {...props} /></Col>)}   
                        <Col className="mainCalendar" lg={!sidebar ? (6) : (9)} md={!sidebar ? (6) : (9)}  >
                            <Calendar {...props} />

                        </Col>
                        <Col className="sidebarcss" lg={3} md={3}>
                            <SidebarEventsComponent  {...props} />
                        </Col>
                    </Row>
                </Col>
            </div>
    );
}

export default MainComponent;