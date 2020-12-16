import { useContext } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Calendar from '../components/Calendar'
import { Col } from 'reactstrap'
import { sessionContext } from '../provider/contextGlobal'


const MainComponent = () => {

    const { sidebar } = useContext(sessionContext)

    return (
        <>
            <Header />
            <div className="container row col-12">
                {!sidebar && (<Sidebar />)}
                <Col lg={!sidebar ? (8) : (10)} >
                    <Calendar />
                </Col>
                <Col>
                    Actividades de hoy
                </Col>
            </div>
        </>


    );
}

export default MainComponent;