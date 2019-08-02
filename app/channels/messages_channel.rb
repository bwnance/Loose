class MessagesChannel < ApplicationCable::Channel
  def subscribed
    # channel = Channel.find(params[:channel_id])
    channel = Channel.find(1);
    stream_for channel
  end
  def send_message(message)
  end
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
