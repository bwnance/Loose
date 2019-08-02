class Api::MessagesController < ApplicationController
    def index
        @messages = Channel.find(params[:channel_id]).messages
        render :index
    end
    def create
        channel = Channel.find(params[:channel_id])
        @message = channel.messages.new(message_params)
        @message.sender_id = current_user.id if current_user
        if @message.save
            # MessagesChannel.broadcast_to channel, @message
            # head :ok
        else
            debugger
            @errors = @message.errors.full_messages
            render 'api/errors/message_errors'
        end
    end
    def update
        @message = Message.find(params[:id])
        if @message
        else
        end
    end

    def message_params
        params.require(:message).permit(:body)
    end

end