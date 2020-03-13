import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spring, animated, config } from 'react-spring/renderprops';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import 'moment-timezone';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';

import { fetchCreateDataExcel, handleGroup } from '../actions';
import IconNotAnimate from './IconNotAnimate';

class StepFinalScreen extends Component {
    
    componentDidMount() {
        const { datas, history } = this.props;

        if(!datas.dataGroupSelected) {
            history.push('/');
            return false;
        }
    }

    handleClick = (e) => {
        e.preventDefault();

        const { handleGroup, datas } = this.props;
        handleGroup(datas.dataGroupSelected, false);
    }

    componentDidUpdate(prevProps) {
        const { datas, history } = this.props;
        if(datas.isReset && datas.isReset !== prevProps.datas.isReset) {
            history.replace('/');
        }
    }

    render() {
        const { datas } = this.props;

        if(datas.loading) {
            return (
                <div className="loading-container">
                    <div className="loading-bg"></div>
                    <ReactLoading type={'spinningBubbles'} color={'#3aa757'} height={80} width={80} />
                </div>
            )
        }

        return (
            <Spring
                from={{ opacity: 0, y: 150 }}
                to={{ opacity: 1, y: 0 }}
                config={config.molasses}>
                { props => 
                    <animated.div className="app-final-container height-full"
                    style={{
                        position: 'relative',
                        transform:`translate3d(0,${props.y}px,0)`,
                        opacity: props.opacity
                    }}>
                        <h2 className="title">Your Final Score</h2>
                        <ul className="flex-row">
                            <li className="cols cols-1">
                                <div className="border-first">
                                    <p className="title">TOTAL COINS ACCUMULATED</p>
                                    <p className="result">{datas.coinsIncrementLatest}</p>
                                </div>
                            </li>
                            <li className="cols cols-2">
                                <div className="border-second">
                                    <p className="title">TEAM MORALE</p>
                                    <div className="result"><IconNotAnimate {...this.props} /></div>
                                </div>
                            </li>
                        </ul>
                        {
                            (datas.dataSummary && datas.dataSummary.length > 0) &&
                                <Table hover>
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>YOUR ANSWERS</th>
                                        <th>Coins</th>
                                        <th>Morale</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        datas.dataSummary.map((item, index) => {
                                            return (
                                                <tr key={`item-final-${index}`}>
                                                    <th scope="row">Q{index + 1}</th>
                                                    <td dangerouslySetInnerHTML={{__html: item.question}}></td>
                                                    <td>{item.coinsIncrementLatest}</td>
                                                    <td>{item.finalImpactScore}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </Table>
                        }
                        <div className="final-bottom">
                            <div className="bottom-area flex-half">
                                <div className="img-area">
                                </div>
                            </div>
                            <button type="submit" className="btn-transparent flex-half" onClick={this.handleClick}>
                                <FontAwesomeIcon icon="arrow-left" size="lg" /> Go to HOME PAGE
                            </button>
                        </div>
                    </animated.div>
                }
            </Spring>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchCreateDataExcel: (data) => { dispatch(fetchCreateDataExcel(data)) },
        handleGroup: (dataGroupSelected, bool) => { dispatch(handleGroup(dataGroupSelected, bool)) }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StepFinalScreen));