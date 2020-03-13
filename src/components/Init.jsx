import React, { Component } from 'react';
import {
	Container, Row, Col, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
import { withRouter } from 'react-router-dom';

import { handleGroup, fetchDataGroups, handleUpdateDataGroup } from '../actions';
import { ROOT_HTTP_URL, ROOT_HTTPS_URL } from '../private/config';
import io from 'socket.io-client';
const socket = io(ROOT_HTTP_URL, {transports: ['websocket']});
window.socket = socket;

class Init extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			dropdownOpen: false,
			dataGroupSelected: null
		};

		const elem = document.getElementById('root');
		if(elem) {
			elem.classList.add('height-full');
		}
		window.socket.on('GET_DATA_GROUPS', groups => {
			const dataGroups = JSON.parse(groups);
			if(!dataGroups.error) {
				props.handleUpdateDataGroup(dataGroups.groups);
			}
		});
	}

	componentDidMount() {
		const { fetchDataGroups } = this.props;
		fetchDataGroups();
	}

	handleClick(item) {
		const { handleGroup } = this.props;

		this.setState({
			dataGroupSelected: item	
		});
		handleGroup(item, true);
	}

	componentDidUpdate(prevProps) {
		const { datas, history } = this.props;

		if (datas.dataGroupSelected && datas.dataGroupSelected !== prevProps.datas.dataGroupSelected) {
			history.push('/before');
		}
	}

	toggle() {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render() {
		const { datas } = this.props;
		const { dataGroupSelected } = this.state;

		return (
			<div className="init-container main-bg height-full">
				<div className="bg-arrow height-full">
					<Container>
						<Row>
							<Col>
								{
									datas.loading ?
										<div className="loading-container">
											<div className="loading-bg"></div>
											<ReactLoading type={'spinningBubbles'} color={'#3aa757'} height={80} width={80} />
										</div>
										:
										<div className="wrapper">
											<h1 className="title">Let’s get started!</h1>
											<div className="group-container">
												<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
													<DropdownToggle caret>
														{ dataGroupSelected ? dataGroupSelected.name : 'Table' }
													</DropdownToggle>
													{
														(datas.data.groups && datas.data.groups.length > 0) &&
														<DropdownMenu>
															{
																datas.data.groups.map(item => {
																	return (
																		<DropdownItem key={item._id} active={(dataGroupSelected && dataGroupSelected._id == item._id) ? true : false} disabled={item.isUsed} onClick={() => this.handleClick(item) }>
																			{item.name}
																		</DropdownItem>
																	)
																})
															}
														</DropdownMenu>
													}

												</Dropdown>
											</div>
										</div>
								}
							</Col>
						</Row>
					</Container>
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
		handleGroup: (dataGroupSelected, bool) => { dispatch(handleGroup(dataGroupSelected, bool)) },
		fetchDataGroups: () => { dispatch(fetchDataGroups()) },
		handleUpdateDataGroup: (dataGroups) => { dispatch(handleUpdateDataGroup(dataGroups)) },
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Init));