import React, { useState } from 'react'
import millify from 'millify'
import HTMLReactParser from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { Row, Col, Typography, Select } from 'antd'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'
import LineChart from './LineChart'
const { Title, Text } = Typography
const { Option } = Select

const CryptoDetails = () => {
    const { coinId } = useParams()
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
    // console.log(data)
    const cryptoDetails = data?.data?.coin
    // console.log(data?.data?.coin)
    // console.log(cryptoDetails?.name)
    // console.log(cryptoDetails?.description)
    // console.log(data?.data?.coin.name)

    if (isFetching) return 'Loading...'

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: `${cryptoDetails?.numberOfMarkets && cryptoDetails?.numberOfMarkets}`, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: `${cryptoDetails?.numberOfExchanges && cryptoDetails?.numberOfExchanges}`, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: `${cryptoDetails?.approvedSupply && cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.totalSupply && millify(cryptoDetails?.totalSupply)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.circulatingSupply && millify(cryptoDetails?.circulatingSupply)}`, icon: <ExclamationCircleOutlined /> },
    ];


    return (
        <Col className='coin-detail-container'>
            <Col className='coin-heading-container'>
                <Title level={2} className='coin-name'>
                    {cryptoDetails?.name}({cryptoDetails?.slug}) Price
                </Title>
                <p>
                    {cryptoDetails?.name} live price in US dollars.
                    View value statistics,market cap & supply
                </p>
            </Col>
            <Select
                defaultValue='7d'
                className='select-timeperiod'
                placeholder='Select Time Period'
                onChange={value => setTimePeriod(value)}
            >
                {time.map(date =>
                    <Option key={date}>{date}</Option>
                )}
            </Select>

            <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails?.name} />

            <Col className='stats-container'>
                <Col className='coin-value-statistics'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            {cryptoDetails?.name} Value Statistics
                        </Title>
                        <p>An overview showing the stats of {cryptoDetails?.name}</p>
                    </Col>
                    {stats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
                <Col className='other-stats-info'>
                    <Col className='coin-value-statistics-heading'>
                        <Title level={3} className='coin-details-heading'>
                            Others Statistics
                        </Title>
                        <p>An overview showing the stats of all cryptocurrencies</p>
                    </Col>
                    {genericStats.map(({ icon, title, value }) => (
                        <Col className='coin-stats'>
                            <Col className='coin-stats-name'>
                                <Text>{icon}</Text>
                                <Text>{title}</Text>
                            </Col>
                            <Text className='stats'>{value}</Text>
                        </Col>
                    ))}
                </Col>
            </Col>

            <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title className='coin-details-heading' level={3}>
                        What is {cryptoDetails?.name}?
                    </Title>
                    {HTMLReactParser(cryptoDetails?.description && cryptoDetails?.description || '')}

                    {/* cryptoDetails && { HTMLReactParser(cryptoDetails.description)} */}
                </Row>
                <Col className='coin-links'>
                    <Title level={3} className='coin-details-heading'>
                        {cryptoDetails?.name} Links
                    </Title>
                    {cryptoDetails?.links.map(link => (
                        <Row className='coin-link' key={link.name}>
                            <Title level={5} className='link-name'>
                                {link.type}
                            </Title>
                            <a href={link.url} target='_blank' rel='norefferer noopener'>
                                {link.name}
                            </a>
                        </Row>
                    ))}
                </Col>
            </Col>
        </Col>
    )
}

export default CryptoDetails
