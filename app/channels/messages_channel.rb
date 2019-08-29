class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # @messageable = Channel.find(params[:channel_id]) if params[:channel_id]
    # debugger
    messageable_constant = params[:messageable_type].constantize
    @messageable = messageable_constant.find(params[:messageable_id]) if params[:messageable_id]
    # @messageable = messageableConstant.find(params[:channel_id])
    # debugger
    #channel = Channel.first;
    stream_for @messageable
  end 
  
  def receive(data)
    
    request_data = data["data"]
    case data["type"]
      when "DELETE_MESSAGE"
        message = Message.find_by(id: request_data["message_id"])
        channel = message.messageable
        if message.destroy
          sendDeleteMessage(channel, message)
        end
      when "NEW_MESSAGE"
        # debugger
        @message = @messageable.messages.new(body: request_data["body"])
        @message.sender_id = current_user.id
        if @message.save
            sendMessage(@messageable, @message)
        else
          puts(@messages.errors.full_messages)

        end
      when "UPDATE_MESSAGE"
        message = Message.find_by(id: request_data["message_id"])
        if message
          # debugger
          message.update(request_data["message"])
          # sendDeleteMessage(@messageable, message)
          sendMessage(@messageable, message)
        end
    end
    
  end
  def sendMessage(channel, message)
    MessagesChannel.broadcast_to(channel,  {type: "NEW_MESSAGE", message: message})
  end
  def sendDeleteMessage(channel, message)
    MessagesChannel.broadcast_to(channel,  {type: "DELETE_MESSAGE", messageId: message.id})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
