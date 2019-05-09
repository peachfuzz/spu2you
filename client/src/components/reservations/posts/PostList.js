import React, { Component } from "react";

import PostDetail from "./PostDetail";
class PostList extends Component {
	handleDateCallback(txtMsg) {
		alert(txtMsg);
		console.log(this);
	}
	render() {
		const { post } = this.props;
		return (
			<div>
				{this.props.PostData.map((item, index) => {
					return (
						<PostDetail
							post={item}
							key={"post-list-key ${index}"}
							dateCallback={this.handleDateCallback}
						/>
					);
				})}
			</div>
		);
	}
}
export default PostList;
