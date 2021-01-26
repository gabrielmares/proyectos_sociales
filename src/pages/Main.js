import { useContext } from 'react'
import Header from '../components/privates/Header'
import Sidebar from '../components/privates/Sidebar'
import Calendar from '../components/privates/Calendar'
import { Col, Row } from 'reactstrap'
import { sessionContext } from '../provider/contextGlobal'


const MainComponent = () => {

    const { sidebar } = useContext(sessionContext)

    return (
        <div className="mainCss">
            <Header />
            <Col lg={12}>
                <Row >
                    {!sidebar && (<Sidebar />)}
                    <Col lg={!sidebar ? (8) : (10)}  >
                        <Calendar />

                    </Col>
                    <Col className="sidebarcss" lg={!sidebar && (2)}>
                        <h4 className="text-center pt-4">Actividades para hoy</h4>
                    </Col>
                </Row>
            </Col>
        </div>
    );
}

export default MainComponent;