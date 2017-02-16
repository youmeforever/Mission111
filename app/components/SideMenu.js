import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import ChapterList from './ChapterList';

const ANIMATION_DURATION = 400;
const MENU_OFFSET = 150;
const DeviceScreen = Dimensions.get('window');

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuLeft: new Animated.Value(-DeviceScreen.width),
      menuWidth: new Animated.Value(0),
    };

    this._onChapterSelection = this._onChapterSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.state.menuWidth.setValue(DeviceScreen.width);
      Animated.timing(this.state.menuLeft, {
          toValue: 0,
          duration: ANIMATION_DURATION,
        }
      ).start();
    } else {
      Animated.timing(this.state.menuLeft, {
          toValue: -DeviceScreen.width,
          duration: ANIMATION_DURATION,
        }
      ).start(() => {
        this.state.menuWidth.setValue(0);
      });
    }
  }

  render() {
    return (
      <Animated.View scrollsToTop={false} style={[
        styles.container, {
          width: this.state.menuWidth,
          left: this.state.menuLeft,
        }
      ]} >
        <View style={styles.menu}>
          <ChapterList
            selectedChapterId={this.props.chapterId}
            onChapterTap={this._onChapterSelection}
            {...this.props}
          />
        </View>
        <TouchableWithoutFeedback
          onPress={this.props.hideMenu}
        >
          <View style={styles.clear} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }

  _onChapterSelection(chapterIndex) {
    this.props.hideMenu();
    this.props.setChapter(chapterIndex);
  }
}
SideMenu.propTypes = {
  chapters: React.PropTypes.array.isRequired,
  chapterId: React.PropTypes.number.isRequired,
  setChapter: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  hideMenu: React.PropTypes.func.isRequired,
};
SideMenu.defaultProps = {
  chapters: [],
  isOpen: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    zIndex: 1000000,
  },
  menu: {
    flex: 1,
    width: DeviceScreen.width - MENU_OFFSET,
  },
  // The 'clear' area that shows the UI underneath the
  // side menu. This is implemented as a sibling of the
  // menu in order to implement the "tap the area outside
  // the menu to close it" behavior.
  clear: {
    flex: 1,
    height: DeviceScreen.height,
  }
});

export default SideMenu;