import React, { Component } from 'react';
import { connect } from 'react-redux';

class AppTemp extends Component {

	componentDidMount() {
		const { history } = this.props;
		history.push('/posts');
	}

	render() {

		return (
			<div className="temp-container">
				waiting
			</div>
		)
	}
}

const mapStateToProps = state => {
	return { ...state }
}
export default connect(mapStateToProps)(AppTemp);