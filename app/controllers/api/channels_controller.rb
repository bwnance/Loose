class Api::ChannelsController < ApplicationController
    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            @errors = @channel.errors.full_messages
            render 'api/errors/errors', status: 422
        end
    end

    def index
        #index only shows channels available to the current user.
        current_user_channel_ids = current_user.channels.ids;
        @channels = Channel.includes(:users).select {|channel| current_user_channel_ids.include?(channel.id)}
        render :index
    end
    def addUsersToChannel
        @channel = Channel.find(params[:channel_id])
        if(@channel) 
            debugger
            users = params[:users].map do |user| 
                @user = User.find(user) 
                @user if @user
            end
            @channel.users.concat(users.compact)
        end
    end
    def getDefaultChannelId        
        @channel = Channel.default
        render :show
    end

    def channel_params
        params.require(:channel).permit(:title, :purpose);
    end
    
end