import React, { Component } from 'react';
import { Transition } from 'react-spring/renderprops';

class AnimateBottomToTop extends Component {
	render() {
		const { items } = this.props;

		return (
			<Transition
			  items={items} keys={item => item.key}
			  from={{ transform: 'translate3d(0, 40px,0)', opacity: 0 }}
			  enter={{ transform: 'translate3d(0, -10px,0)', opacity: 1 }}
			  leave={{ transform: 'translate3d(0, 40px,0)', opacity: 0 }}>
			  {item => props => <div style={props} className="main-area" dangerouslySetInnerHTML={{__html: item.text}}></div>}
			</Transition>
		)
	}
}

export default AnimateBottomToTop;