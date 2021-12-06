import React from 'react'
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { useGetExchangesQuery } from '../services/cryptoApi'
import Loader from './Loader'
const { Panel } = Collapse
const { Text } = Typography

const Exchanges = () => {
    const { data, isFetcing } = useGetExchangesQuery()
    // console.log(data)
    // console.log(data?.data?.exchanges)
    const exchangesList = data?.data?.exchanges
    if (isFetcing) return <Loader />

    return (
        <>
            <Row>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>Change</Col>
            </Row>
            <Row>
                {exchangesList && exchangesList.map(exchange => (
                    <Col span={24}>
                        <Collapse accordion>
                            <Panel
                                key={exchange?.id}
                                showArrow={false}
                                header={(
                                    <Row key={exchange?.id} className='header-row'>
                                        <Col span={6}>
                                            <Text><strong>{exchange?.rank}.</strong></Text>
                                            <Avatar className="exchange-image" src={exchange?.iconUrl} />
                                            <Text><strong>{exchange?.name}</strong></Text>
                                        </Col>
                                        <Col span={6}>${millify(exchange?.volume)}</Col>
                                        <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                                        <Col span={6}>{millify(exchange?.marketShare)}%</Col>
                                    </Row>
                                )}
                            >
                                {HTMLReactParser(exchange?.description && exchange?.description || '')}
                            </Panel>

                        </Collapse>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Exchanges
