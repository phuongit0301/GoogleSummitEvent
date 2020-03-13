import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'reactstrap';

import AnimateBottomToTop from './AnimateBottomToTop';
import AnimateIcon from './AnimateIcon';
import { fetchCreateDataExcel, resetWhenComeBack } from '../actions';

class StepTwoScreen extends Component {
	componentDidMount() {
		const { datas, history, fetchCreateDataExcel } = this.props;
		if(!datas.dataGroupSelected) {
            history.push('/');
            return false;
        }

        if(datas.isSubmit) {
	        const data = {
	            group_name: datas.dataGroupSelected.name,
	            coins: datas.coinsIncrementLatest,
	            highest_morale: datas.finalImpactScore,
	            date_created: moment(new Date(), 'DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'),
	            isSubmit: false
	        }
        	fetchCreateDataExcel(data);
        }

        window.onpopstate = () => {
			alert("No going back! The back button is disabled for the cloud journey simulation");
        	return false;
        };
	}
	
	render() {
		const { datas, handleClick } = this.props;

		return (
			<div className="content-right-second-area">
				<div className="header-area">
					<h2 className="title">Your choice resulted in...</h2>
				</div>
				<div className="content-area">
					<div className="score-area">
						<div className="right">
							<div className="rows row-first">
								<div className="fleft">
									<p className="title">GAIN / LOSS</p>
									<AnimateBottomToTop items={datas.dataCoins} />
								</div>
								<div className="fright border-first">
									<p className="title">COINS</p>
									<p className="result">{datas.coinsIncrementLatest}</p>
								</div>
							</div>
							<div className="rows row-second">
								<div className="fleft">
									<p className="title">PEOPLE IMPACT</p>
									<AnimateBottomToTop items={datas.dataPeopleImpact} />
								</div>
								<div className="fright border-second">
									<AnimateIcon {...this.props} />
								</div>
							</div>
						</div>
					</div>
					<div className="detail-area">
						<div className="pros-area">
							<strong>Pros</strong>
							<div dangerouslySetInnerHTML={{__html: datas.dataQuestionSelected.pros}}></div>
						</div>
						<div className="cons-area">
							<strong>Cons</strong>
							<div dangerouslySetInnerHTML={{__html: datas.dataQuestionSelected.cons}}></div>
						</div>
					</div>
					<Button color="primary" onClick={(e) => handleClick(e)}>{datas.steps < 5 ? 'Next Question' : 'View Final Score'}</Button>
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
        fetchCreateDataExcel: (data) => { dispatch(fetchCreateDataExcel(data)) },
        resetWhenComeBack: () => { dispatch(resetWhenComeBack()) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(StepTwoScreen);