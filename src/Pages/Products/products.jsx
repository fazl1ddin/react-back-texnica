import { Col, Row } from "antd"
import PageTitle from "../../Components/PageTitle/PageTitle"

function Products({statistics, stLoading}) {
    return <>
        <PageTitle title={"Products"} />
        <Row>
            <Col className="bg-slate-900 h-40" xs={24} md={8} lg={6}>

            </Col>
            <Col xs={24} md={16} lg={18}>
                <Row wrap>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                    <Col className="h-40 box-border bg-slate-900 border-solid border-blue-50 border-2 w-40" lg={8}>
                        
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}

export default Products