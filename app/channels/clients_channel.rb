class ClientsChannel < ApplicationCable::Channel
  def subscribed
    #  @user = User.find(params[:user_id]) if params[:user_id]
     stream_for current_user if current_user
  end
  def receive(data)
    request_data = data["data"]
    case data["type"]
    when "CREATE_CHANNEL"
      channel = Channel.new(title: request_data["title"], purpose: request_data["purpose"])
      
      if channel.save!
          #add to channel
          users_to_add = request_data["selectedUsers"].is_a?(Array) ? request_data["selectedUsers"] + [current_user.id] : [current_user.id]
          users = User.where(id: users_to_add)
          channel.users.concat(users)
          users.each do |user|
            ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
          end
      else
          #broadcast errors
      end
    when "UPDATE_CHANNEL"
      # debugger
      channel = Channel.find(data["channel_id"])
      if channel.update(request_data)
        i = 0;
        updatedUsers = []
        ActionCable.server.connections.each do |connection|
          # debugger
          connection.subscriptions.identifiers.each_with_index do |identifier|
            hash = JSON.parse(identifier)
            if hash["channel"] == "ClientsChannel"
              user = User.find(hash["user_id"])
              if user && !updatedUsers.include?(user.id)
                # debugger
                updatedUsers << user.id
                ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id, topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
              end
            end
          end
          
        end
        puts i
        message = channel.messages.new(body: "set the channel topic: #{channel.topic}", sender_id: current_user.id, is_auto_message: true)
        if(message.save)
          MessagesChannel.broadcast_to(channel, message);
        end
        # ActionCable.server.broadcast({type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
      end
    when "ADD_USERS_TO_CHANNEL"
      users_to_add = request_data["selectedUsers"]
      channel = Channel.includes(:users).find_by(id: params[:channel_id])
      users = User.where(id: users_to_add)
      if users_to_add && users && channel
        channel.users.concat(users)
        users.each do |user|
            ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id,topic: channel.topic, channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
        end     
      end
    when "ADD_USER_TO_CHANNEL"
      user = User.find_by(id: request_data["user_id"])
      channel = Channel.includes(:users).find_by(id: request_data["channel_id"])
      if user && channel
        channel.users << user
        ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id,topic: channel.topic, channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
      end
    end
  end
  def channel_params
        params.require(:channel).permit(:title, :purpose);
  end
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
