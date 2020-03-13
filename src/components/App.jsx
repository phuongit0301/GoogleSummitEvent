import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleSelectedQuestion, handleShowAnswer, handleHideAnswer } from '../actions';
import LeftScreen from './LeftScreen';
import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';
import StepFinalScreen from './StepFinalScreen';

class App extends Component {

	componentDidMount() {
		const { datas, history } = this.props;
		if(!datas.dataGroupSelected) {
            history.push('/');
            return false;
		}
		var elem = document.getElementById('root');
		if(elem) {
			elem.classList.remove('height-full');
		}
		window.onpopstate = (event) => {
			alert("No going back! The back button is disabled for the cloud journey simulation");
        	return false;
        };
	}

	handleClick = (item) => {
		const { handleSelectedQuestion, datas } = this.props;

		let coins = datas.data.coins - item.cost;
		let finalImpactScore = datas.finalImpactScore + item.peopleImpact;
		let sumLatest = datas.data.coins - item.cost + item.productivity;

		handleSelectedQuestion(item, { coins, sumLatest, finalImpactScore, isSubmit: true });
	}

	handleHideAnswer = (e) => {
		e.preventDefault();
		const { handleHideAnswer } = this.props;

		handleHideAnswer();
	}

	componentDidUpdate(prevProps) {
		const { datas, handleShowAnswer, history } = this.props;

		if(!datas.isShowAudio && datas.isShowAudio !== prevProps.datas.isShowAudio) {
			handleShowAnswer();
		}
	}

	render() {
		const { datas } = this.props;
		let stepScreen = null;
		if(datas && datas.steps < datas.data.questions.length + 1) {
			if(datas.steps >= 1 && datas.steps < datas.data.questions.length + 1) {
				stepScreen = <StepOneScreen datas={datas} handleClick={this.handleClick} />

				if(datas.isShowAnswer) {
					stepScreen = <StepTwoScreen datas={datas} handleClick={this.handleHideAnswer} />
				}
			}
		} else {
			return (
				<StepFinalScreen />
			)
		}

		return (
			<div className="app-container height-full">
				<div className="left-container height-full">
					{
						(datas && datas.dataGroupSelected && datas.steps < datas.data.questions.length + 1) &&
							<LeftScreen question={datas.data.questions[datas.steps - 1]} dataGroupSelected={datas.dataGroupSelected} steps={datas.steps} />
					}
				</div>
				<div className="right-container height-full">
					{ stepScreen }
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { ...state }
}
const mapDispatchToProps = dispatch => {
	return {
		handleSelectedQuestion: (item, obj) => { dispatch(handleSelectedQuestion(item, obj)) },
		handleShowAnswer: () => { dispatch(handleShowAnswer()) },
		handleHideAnswer: () => { dispatch(handleHideAnswer()) },
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);