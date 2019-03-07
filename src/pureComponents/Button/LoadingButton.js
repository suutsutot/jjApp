import React from 'react';
import { TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import T from 'prop-types';

import styles, { getSpecificStyles } from './styles';

export default class Component extends React.PureComponent {
  loadingAnimationTimeout = null;

  static propTypes = {
    type: T.oneOf('primary', 'text'),
    width: T.number,
    height: T.number,
    borderRadius: T.number,
    opacity: T.number,
    viewStyle: T.object,
    textStyle: T.object,
    loading: T.bool.isRequired
  };

  static defaultProps = {
    type: 'primary',
    activityIndicatorColor: 'white',
    width: 150,
    height: 40,
    borderRadius: 20,
    opacity: 0,
    loading: false
  };

  constructor(props) {
    super(props);
    const { loading, width, height, borderRadius } = props;

    this.state = { showLoading: loading };

    if (loading) {
      this.loadingValue = {
        width: new Animated.Value(height),
        borderRadius: new Animated.Value(height / 2),
        opacity: new Animated.Value(0)
      };
    } else {
      this.loadingValue = {
        width: new Animated.Value(width),
        borderRadius: new Animated.Value(borderRadius),
        opacity: new Animated.Value(1)
      };
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      this.toggleLoading(this.props.loading);
    }
  }

  componentWillUnmount() {
    if (this.loadingAnimationTimeout) {
      clearTimeout(this.loadingAnimationTimeout);
    }
  }

  toggleLoading(showLoading) {
    if (showLoading) {
      this.loadingAnimation(
        undefined,
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
        this.loadingAnimation(
          () => this.setState({ showLoading: showLoading }),
          this.props.height,
          this.props.width,
          this.props.height / 2,
          this.props.borderRadius,
          0,
          1
        );
      }, 1000);
    }
  }

  loadingAnimation(
    cb,
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
      }).start(cb);

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
    const { showLoading } = this.state;
    const { type, viewStyle, onPress } = this.props;

    const specificStyles = getSpecificStyles(type);

    return (
      <TouchableOpacity
        onPress={() => {
          !showLoading && onPress && onPress();
        }}
      >
        <Animated.View
          style={[
            styles.buttonView,
            specificStyles.buttonView,
            {
              width: this.loadingValue.width,
              borderRadius: this.loadingValue.borderRadius
            },
            viewStyle
          ]}
        >
          {showLoading ? this.renderIndicator() : this.renderTitle()}
        </Animated.View>
      </TouchableOpacity>
    );
  }

  renderTitle() {
    const { type, textStyle } = this.props;

    const specificStyles = getSpecificStyles(type);

    return (
      <Animated.Text
        style={[
          styles.buttonText,
          specificStyles.buttonText,
          {
            opacity: this.loadingValue.opacity
          },
          textStyle
        ]}
        numberOfLines={1}
      >
        {this.props.title}
      </Animated.Text>
    );
  }

  renderIndicator() {
    return <ActivityIndicator color={this.props.activityIndicatorColor} />;
  }
}
