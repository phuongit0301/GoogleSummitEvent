import React, { Component } from 'react';
import CoinSound from '../assets/audio/coin-sound.mp3';

export default class AudioScreen extends Component {
	render() {
		return (
			<audio className="player" preload="false" autoPlay>
				<source src={CoinSound} />
			</audio>
		)
	}
}