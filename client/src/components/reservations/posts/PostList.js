import React, { Component } from 'react'
//import PostData from '../data/posts.json'

import PostDetail from './PostDetail'
class PostList extends Component {

    handleDateCallback(txtMsg) {
        alert(txtMsg)
        console.log(this)

    }
    render() {
        const { post } = this.props
        // const cellRenderer = 10

        return (

            <div>
                {/* <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
                <Table numRows={10}>
                    {<Column name="Dates"/>}
                     {/* //cellRenderer={cellRenderer} */}
                {/* </Table> */}

                {this.props.PostData.map((item, index) => {
                    return <PostDetail
                        post={item}
                        key={'post-list-key ${index}'}
                        dateCallback={this.handleDateCallback}
                    />

                })}

            </div>

        )
    }
}
export default PostList