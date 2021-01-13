import { useContext } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar'
import { Col, Row } from 'reactstrap'
import { sessionContext } from '../provider/contextGlobal'


const MainComponent = () => {

    const { sidebar } = useContext(sessionContext)

    return (
        <div className="mainCss">
            <Header />
            <Col lg={12}>
                <Row>
                    {!sidebar && (<Sidebar />)}
                    <Col lg={!sidebar ? (8) : (10)}  >
                        <Row>
                            <Calendar />
                        </Row>

                    </Col>
                    <Col className="sidebarcss" lg={2}>
                        Actividades de hoy
                    </Col>
                </Row>

            </Col>
        </div>
    );
}

export default MainComponent;