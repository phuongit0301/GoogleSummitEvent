import React, { Component } from 'react';

export default class ProgressiveImage extends Component {
    constructor(props) {

        super(props);

        this.state = {
            currentImage: props.src || '',
            loading: true,
        }
    }

    componentDidMount() {
        this.fetchImage(this.props.src)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState({ currentImage: nextProps.src, loading: true }, () => {
                this.fetchImage(nextProps.src)
            })
        }
    }

    componentWillUnmount() {
        if (this.loadingImage) {
            this.loadingImage.onload = null
        }
    }

    fetchImage = src => {
        const image = new Image()
        image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false })
        image.src = src
        this.loadingImage = image
    }

    style = loading => {
        return {
            transition: '0.5s filter linear',
            filter: `${loading ? 'blur(50px)' : ''}`,
        }
    }

    render() {
        const { currentImage, loading } = this.state
        const { alt } = this.props
        return (
            <img style={this.style(loading)} src={currentImage} alt={alt} />
        )
    }
}