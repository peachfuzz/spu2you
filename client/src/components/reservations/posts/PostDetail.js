import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import moment from "moment";

class PostDetail extends Component {
	constructor(props) {
		super(props);
		this.titleWasClicked = this.titleWasClicked.bind(this);
		this.checkInWasClicked = this.checkInWasClicked.bind(this);
		this.deleteWasClicked = this.deleteWasClicked.bind(this);
		this.state = {
			showMe: true
		};
	}

	titleWasClicked(event) {
		event.preventDefault();
		const { dateCallback } = this.props;
		if (dateCallback !== undefined) {
			dateCallback("YAS MAJOR ALERT");
		}
	}

	checkInWasClicked(event) {
		event.preventDefault();
		const { dateCallback } = this.props;

		if (dateCallback !== undefined) {
			dateCallback("Are you sure you want to check into your reservation");
		}
	}

	deleteWasClicked(event) {
		event.preventDefault();
		const { dateCallback } = this.props;
		if (dateCallback !== undefined) {
			dateCallback("Are you sure you want to delete reservation");

			//<button onClick={() => this.operation()}> Click me </button>
		}
	}

	render() {
		const { post } = this.props;
		const { isOpen, isOpenError, ...alertProps } = this.state;
		return (
			<div>
				<h2 onClick={this.titleWasClicked}>
					{moment(post.date).format("MMMM D, Y")}
				</h2>
				<p>{post.time}</p>

				<h2 onClick={this.deleteWasClicked}>
					{<Button rightIcon="trash" intent="success" text="Delete" />}
				</h2>
			</div>
		);
	}
}
export default PostDetail;
