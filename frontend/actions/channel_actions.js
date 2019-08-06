import * as ChannelsApiUtil from '../util/channels_api_util'



export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS"
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL"
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";

export const receiveChannels = (channels) =>{
    return {
        type: RECEIVE_CHANNELS,
        channels
    }
}

export const receiveChannel = (channel) =>{
    return {
        type: RECEIVE_CHANNEL,
        channel
    }
}
export const receiveChannelErrors = (errors) => {
    return {
        type: RECEIVE_CHANNEL_ERRORS,
        errors
    }
}

export const addUsersToChannel = (users, channelId) => dispatch =>{
    return ChannelsApiUtil.addUsersToChannel(users, channelId)
        // .then((channels) => dispatch(receiveChannels(channels)))
        .fail((errors) => dispatch(receiveChannelErrors(errors)))
}
export const fetchChannels = () => dispatch => {
    return ChannelsApiUtil.fetchChannels()
        .then((channels) => dispatch(receiveChannels(channels)))
        .fail((errors) => dispatch(receiveChannelErrors(errors)))
}

export const createChannel = (channel) => dispatch => {
    return ChannelsApiUtil.createChannel(channel)
        .then((channel) => dispatch(receiveChannel(channel)))
        .fail((errors) => dispatch(receiveChannelErrors(errors)))
}