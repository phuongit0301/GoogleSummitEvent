import React, { Component } from 'react';

import { IMAGES } from '../private/common';
import ProgressiveImage from './ProgressiveImage';


class LeftScreen extends Component {
	render() {
		const {  dataGroupSelected, question, steps } = this.props;
		const imageUrl = require('../assets/images/' + IMAGES[steps - 1]);
		return (
			<div className={`content-left-area height-full`}>
				<div className={`image-container bg-${steps} height-full`}>
					<ProgressiveImage src={imageUrl} />
				</div>
				<div className="content-area">
					<h2 className="title">{dataGroupSelected.name}</h2>
					<h2 className="title">Question {steps}</h2>
					<div className="brief-area" dangerouslySetInnerHTML={{__html: (question && question.description) ? question.description : ''}}>
					</div>
					<div className="img-area">
					</div>
				</div>
			</div>
		)
	}
}
export default LeftScreen;