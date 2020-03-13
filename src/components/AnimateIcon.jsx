import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import { IMAGES_ICON } from '../private/common';

class AnimateIcon extends Component {
	render() {
        const { datas } = this.props;
        let items = [];
        let imageUrl = '';
        let subText = '';
        let subTextClass = '';

        if(datas.data && datas.data.moraleScores && datas.data.moraleScores.length > 0) {
            datas.data.moraleScores.map((item, index) => {
                if(item.min <= datas.finalImpactScore && item.max >= datas.finalImpactScore) {
                    let dataItem = {};
                    imageUrl = require('../assets/images/' + IMAGES_ICON[index]);
                    dataItem.key = `animte-icon-${index}`;
                    items.push(dataItem);
                }
            });
        }

        if(datas.finalImpactScore === 0) {
            subText = '-';
            subTextClass = 'txt-yellow';
        } else if(datas.finalImpactScore === 3 || datas.finalImpactScore === 6 || datas.finalImpactScore === 9) {
            subText = '+';
            subTextClass = 'txt-green';
        } else if(datas.finalImpactScore === 4 || datas.finalImpactScore === 7 || datas.finalImpactScore === 10) {
            subText = '++';
            subTextClass = 'txt-green';
        }
        
		return (
			<Spring
                duration={1000}
                delay={1000}
                from={{ transform: 'translate3d(0, 40px,0)', opacity: 0 }}
                to={{ transform: 'translate3d(0, -10px,0)', opacity: 1 }}
                leave={{ transform: 'translate3d(0, 40px,0)', opacity: 0 }}>
                { props => <div style={props} className="icon-area"><img src={imageUrl} alt="icons" /><span className={`sub-icon ${subTextClass}`}>{subText}</span></div>}
			</Spring>
		)
	}
}

export default AnimateIcon;