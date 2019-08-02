class MessagesChannel < ApplicationCable::Channel
  def subscribed
    puts(params[:channel_id])
    @channel = Channel.find(params[:channel_id]) if params[:channel_id]
    debugger unless @channel
    #channel = Channel.first;
    stream_for @channel
    
  end
  def receive(data)
    @message = @channel.messages.new(body: data["body"])
    @message.sender_id = current_user.id
    if @message.save
        MessagesChannel.broadcast_to(@channel, @message)
    else
    end
  end
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
