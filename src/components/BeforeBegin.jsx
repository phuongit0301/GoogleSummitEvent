import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleStart, handleGroupWhenComeBack } from '../actions';

class BeforeBegin extends Component {

	handleBack = (e) => {
		e.preventDefault();

		const { handleGroupWhenComeBack, datas } = this.props;

		handleGroupWhenComeBack(datas.dataGroupSelected, true);
	}

	handleConfirmAndStart = (e) => {
		e.preventDefault();

		const { handleStart } = this.props;

		handleStart();
	}

	componentDidUpdate(prevProps) {
		const { datas, history } = this.props;

		if (datas.isStart && datas.dataGroupSelected) {
			history.push('/temp');
		}

		if(datas.isComeBack) {
			history.replace('/');
		}
	}

	render() {
		const { datas } = this.props;
		let str = "";

		if(datas && datas.dataGroupSelected && datas.dataGroupSelected.name) {
			const arr = datas.dataGroupSelected.name.split(" ");
			str = (arr && arr.length > 0) ? arr[1] : 1;
		}

		return (
			<div className="temp-container flex-column">
				<div className="top-area flex-row flex-vertical-center">
					<div className="left flex-half">
						<h1 className="title">Before we begin...</h1>
						<p className="description-area">
							Please ask your assigned Googler to confirm your table number before proceeding
						</p>
					</div>
					<div className="right flex-half">
						<h1 className="title txt-green">TABLE NO.</h1>
						<p className="title-number">{str}</p>
						<div className="group-button">
							<button type="submit" className="btn btn-grey" onClick={this.handleBack}>BACK</button>
							<button type="submit" className="btn btn-green" onClick={this.handleConfirmAndStart}>CONFIRM AND START</button>
						</div>
					</div>
				</div>
				<div className="bottom-area">
					<div className="img-area">
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { ...state }
}
const mapDispatchToProps = dispatch => {
	return {
		handleStart: () => { dispatch(handleStart()) },
		handleGroupWhenComeBack: (dataGroupSelected, isComeBack) => { dispatch(handleGroupWhenComeBack(dataGroupSelected, isComeBack)) },
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(BeforeBegin);