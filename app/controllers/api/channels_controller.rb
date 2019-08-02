class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            current_user.channels << @channel
            ActionCable.server.broadcast 'channels_channel', @channel
            render :show
        else
            @errors = @channel.errors.full_messages
            render 'api/errors/errors', status: 422
        end
    end

    def index
        #index only shows channels available to the current user.
        current_user_channel_ids = current_user.channels.ids;
        @channels = Channel.select {|channel| current_user_channel_ids.include?(channel.id)}
        render :index
    end
    def channel_params
        params.require(:channel).permit(:title, :purpose);
    end
end