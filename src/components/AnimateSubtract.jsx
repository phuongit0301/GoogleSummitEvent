import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops';

class AnimateSubtract extends Component {
	render() {
		const { text } = this.props;
		const items = [{key: '1', text: text }];

		return (
			<Transition
			  items={items} keys={item => item.key}
			  from={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}
			  enter={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}
			  leave={{ transform: 'translate3d(0,-40px,0)', opacity: 0 }}>
			  {item => props => <div style={props}>{item.text}</div>}
			</Transition>
		)
	}
}

export default AnimateSubtract;