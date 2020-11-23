import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Card, Row, Col, Avatar, Icon } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log("response.data: ", response.data);
                    console.log("response.data.videos: ", response.data.videos);
                    setVideo(response.data.videos);
                } else {
                    alert('비디오 가져오기를 실패 했습니다.')
                }

            })
    }, [])

    const renderCards = Video.map((video) => {
        console.log("v: ", video);
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <a href={`/post/${video._id}`}>
                <div style={{ position: 'relative' }}>
                    {/* <div style={{ width: '100%' }} backgroundImage={{ url: `http://localhost:5000/${video.thumbnail}` }} /> */}
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.filePath}`} />
                    <div className='duration'>
                        <span>{minutes}:{seconds}</span>
                    </div>
                </div>
            </a>
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span><br />
            <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} >List</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default withRouter(LandingPage)
