import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import { withRouter } from 'react-router-dom';
import Comment from './Sections/Comment';
import Axios from 'axios';

function DetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videoDetail);
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }
            })

        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.comments);
                    setComments(response.data.comments)
                } else {
                    alert('댓글 정보를 가져오길 실패했습니다.')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }


    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={24} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem' }}>
                        <img style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        {/* <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls /> */}
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avator={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                        {/* {VideoDetail.writer.role === '1'
                            ?
                            <div>

                                <input type="button" value="수정 " />
                                <input type="button" value="삭제" />
                            </div>
                            : null} */}
                        {user.userData.isAdmin === true
                            ?
                            <div>

                                <input type="button" value="수정 " />
                                <input type="button" value="삭제" />
                            </div>
                            : null}
                        {/* Comments */}
                        <Comment commentLists={Comments} postId={videoId} refreshFunction={refreshFunction} />
                    </div>
                </Col>
            </Row>
        )
    }
    else {
        return (
            <div>...loading</div>
        )
    }

}

export default withRouter(DetailPage)
