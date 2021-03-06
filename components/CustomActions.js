import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from 'react';
import PropTypes from "prop-types";




export default class CustomActions extends React.Component {
    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', ' Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('pick an image');
                        return;
                    case 1:
                        console.log('take picture');
                        return;
                    case 2:
                        console.log('send location');
                        return;
                    default:
                }
            }
        );

    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onActionPress} >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
})

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};