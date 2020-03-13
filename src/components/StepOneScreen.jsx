import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AnimateSubtract from './AnimateSubtract';
import Items from './Items';
import { resetWhenComeBack } from '../actions';

class StepOneScreen extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			indexSelected: null,
			disabledButton: false
		}

		this.dataQuestionSelected = null;
	}

	componentDidMount() {
		const { datas, history } = this.props;
		this.setState({ disabledButton: false });

		if(!datas.dataGroupSelected) {
            history.push('/');
            return false;
        }

        window.onpopstate = (event) => {
        	alert("No going back! The back button is disabled for the cloud journey simulation");
        	return false;
        };
	}


	handleClick = (item, index) => {
		item.index = index;
		this.dataQuestionSelected = item;
		this.setState({
			indexSelected: index
		});
	}

	handleGoToAnswer(e) {
		e.preventDefault();

		const { handleClick } = this.props;

		this.setState({ disabledButton: true });
		handleClick(this.dataQuestionSelected);
	}

    render() {
        const { datas } = this.props;
        const { indexSelected, disabledButton } = this.state;

        return (
            <div className="content-right-area">
				<div className="header-area">
					<h2 className="title">You decide to...</h2>
					<ul>
						<li className="border-first">
							{ 
								datas.isShowAudio && 
									<div className="animate-area">
										<AnimateSubtract text={`- ${datas.dataQuestionSelected.cost}`} />
									</div>
							}
							<p className="title">COINS</p>
							<p className="result">{datas.data.coins}</p>
						</li>
						{/* <li className="border-second">
							{ 
								datas.isShowAudio && 
									<div className="animate-area">
										<AnimateSubtract text={`${datas.dataQuestionSelected.peopleImpact}`} />
									</div>
							}
							<p className="title">TEAM MORALE</p>
							<p className="result"></p>
						</li> */}
						{/* <li className="border-third">
							<p className="title">Immediate Revenue Returns</p>
							<p className="result">{datas.data.cultureGrade}</p>
						</li> */}
					</ul>
				</div>
				<div className="content-area">
					{
						(datas.data && datas.data.questions && datas.data.questions.length > 0 && datas.steps < datas.data.questions.length + 1) && 
							datas.data.questions[datas.steps - 1].answers.map((item, index) => {
								return (
									<Items key={`items-${index}`} item={item} index={index} indexSelected={indexSelected} isShowAudio={datas.isShowAudio} isAcceptClick={true} handleClick={this.handleClick} />
								)
							})
					}
					<Button color="success" disabled={(indexSelected && !disabledButton) ? false : true} onClick={(e) => this.handleGoToAnswer(e)}>Submit Answer</Button>
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
        resetWhenComeBack: () => { dispatch(resetWhenComeBack()) }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StepOneScreen));
