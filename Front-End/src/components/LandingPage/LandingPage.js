import Navigationbar from '../Navigationbar/Navigationbar'
import {
    Container, Row, Col, Figure,
} from 'react-bootstrap';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div>
            <Navigationbar />
            <div className="container">
                <div className="description">
                    <Container>
                        <div>
                            <Row>
                                <Col>
                                    <div id="landingpagecaption">
                                        <h1> Now loading: </h1>
                                        <br />
                                        <h1>Antibodies…</h1>
                                        <br />
                                    </div>
                                </Col>
                                <Col>
                                    <div id="landingpageimage">
                                        <Figure.Image
                                            src={`${window.location.origin}/landingpage.svg`}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;