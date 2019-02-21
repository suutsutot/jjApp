import React from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  ActivityIndicator,
  View
} from 'react-native';

import styles from './styles';

export default class Component extends React.PureComponent {
  loadingAnimationTimeout = null;

  static defaultProps = {
    title: 'Button',
    titleColor: 'white',
    backgroundColor: 'gray',
    activityIndicatorColor: 'white',
    borderRadius: 0
  };

  constructor(props) {
    super(props);

    this.state = { showLoading: false };

    this.loadingValue = {
      width: new Animated.Value(props.width),
      borderRadius: new Animated.Value(props.borderRadius),
      opacity: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.showLoading(this.props.loading);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.showLoading(this.props.loading);
    }
  }

  componentWillUnmount() {
    if (this.loadingAnimationTimeout) {
      clearTimeout(this.loadingAnimationTimeout);
    }
  }

  showLoading(showLoading) {
    if (showLoading) {
      this._loadingAnimation(
        this.props.width,
        this.props.height,
        this.props.borderRadius,
        this.props.height / 2,
        1,
        0
      );
      this.setState({ showLoading: showLoading });
    } else {
      this.loadingAnimationTimeout = setTimeout(() => {
        this.loadingAnimationTimeout = null;
        this._loadingAnimation(
          this.props.height,
          this.props.width,
          this.props.height / 2,
          this.props.borderRadius,
          0,
          1
        );
        this.setState({
          showLoading: showLoading
        });
      }, 1000);
    }
  }

  _loadingAnimation(
    widthStart,
    widthEnd,
    borderRadiusStart,
    borderRadiusEnd,
    opacityStart,
    opacityEnd
  ) {
    if (this.loadingValue.width._value !== widthEnd) {
      this.loadingValue.width.setValue(widthStart);
      this.loadingValue.opacity.setValue(opacityStart);
      this.loadingValue.borderRadius.setValue(borderRadiusStart);

      Animated.timing(this.loadingValue.width, {
        toValue: widthEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.borderRadius, {
        toValue: borderRadiusEnd,
        duration: 400
      }).start();

      Animated.timing(this.loadingValue.opacity, {
        toValue: opacityEnd,
        duration: 300
      }).start();
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyles]}>
        <TouchableWithoutFeedback
          onPress={!this.state.showLoading ? this.props.onPress : null}
        >
          <Animated.View
            style={[
              styles.containerButton,
              {
                width: this.loadingValue.width,
                height: this.props.height,
                backgroundColor: this.props.backgroundColor,
                borderWidth: this.props.borderWidth,
                borderRadius: this.loadingValue.borderRadius
              },
              this.props.containerButtonStyles
            ]}
          >
            {this.state.showLoading
              ? this._renderIndicator()
              : this._renderTitle()}
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  _renderTitle() {
    return (
      <Animated.Text
        style={[
          styles.buttonText,
          {
            opacity: this.loadingValue.opacity,
            color: this.props.titleColor,
            fontFamily: this.props.titleFontFamily,
            fontSize: this.props.titleFontSize,
            fontWeight: this.props.titleFontWeight
          },
          this.props.buttonTextStyles
        ]}
      >
        {this.props.title}
      </Animated.Text>
    );
  }

  _renderIndicator() {
    return <ActivityIndicator color={this.props.activityIndicatorColor} />;
  }
}
