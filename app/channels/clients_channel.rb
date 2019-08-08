class ClientsChannel < ApplicationCable::Channel
  def subscribed
    #  @user = User.find(params[:user_id]) if params[:user_id]
     stream_for current_user if current_user
  end
  def getMessageableConst(type)
    type.constantize
  end
  def send_channel_success(user, channel)
    ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id,created_at: channel.created_at,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})

  end
  def send_channel_delete(user, channelId)
    ClientsChannel.broadcast_to(user,{type: "DELETE_CHANNEL", channelId: channel_id})
  end
  def send_receive_channels(user, channels)
    ClientsChannel.broadcast_to(current_user, {type: "RECEIVE_CHANNELS", author_id: current_user.id, channels: channels})
  end
  def send_user_add(user)
    ClientsChannel.broadcast_to(user, {type: "USER_ADD", user: {id: user.id, username: user.username, full_name: user.full_name, channel_ids: user.channels.ids, message_ids: user.messages.ids}})
  end
  def receive(data)
    
    request_data = data["data"]
    case data["type"]
     
      when "FETCH_CHANNEL"
        return if !request_data["messageable_type"] || request_data["channel_id"]
        channel = getMessageableConst(request_data["messageable_type"]).find_by(id: request_data["channel_id"])
        if channel
              # ClientsChannel.broadcast_to(current_user, {type: "CHANNEL_SUCCESS", author_id: current_user.id,channel: {id: channel.id,created_at: channel.created_at,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
              send_channel_success(current_user, channel)
        end
      when "DELETE_CHANNEL"
        if request_data["channel_id"] == 1
          return
        end
        channel = Channel.find_by(id: request_data["channel_id"])
        if channel
          channel_id = channel.id
          channel_members = channel.users.ids
          channel.destroy
          users = User.where(id: channel_members)
          
          users.each do |user|
            send_delete_channel(user, channel_id)
          end
        end
      when "FETCH_ALL_CHANNELS"
        channels = Channel.all
        if(channels)
          serialized_channels = {}
          channels.includes(:users).each do |channel|
            serialized_channels[channel.id] = {id: channel.id, created_at: channel.created_at,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}
          end
          send_receive_channels(user, serialized_channels)
          # ClientsChannel.broadcast_to(current_user, {type: "RECEIVE_CHANNELS", author_id: current_user.id, channels: serialized_channels})

        end
      when "CREATE_CHANNEL"
        channel = Channel.new(title: request_data["title"], purpose: request_data["purpose"])
        if channel.save!
            #add to channel
            users_to_add = request_data["selectedUsers"].is_a?(Array) ? request_data["selectedUsers"] + [current_user.id] : [current_user.id]
            users = User.includes(:channels).where(id: users_to_add)
            channel.users.concat(users)
            
           
            updatedUsers = []
            ActionCable.server.connections.each do |connection|
              # debugger
              connection.subscriptions.identifiers.each_with_index do |identifier|
                hash = JSON.parse(identifier)
                if hash["channel"] == "ClientsChannel"
                  user = User.find_by(id: hash["user_id"])
                  if user && !updatedUsers.include?(user.id)
                    # debugger
                    updatedUsers << user.id
                    # console.log(user)
                    # ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id,  created_at: channel.created_at,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
                    send_channel_success(user, channel)
                  end
                end
              end
            end
          end
        # else
        #     #broadcast errors
        # end
      when "UPDATE_CHANNEL"
        # debugger
        channel = Channel.find_by(id: request_data["channel_id"])
        # debugger
        if channel.id == 1 && request_data["type"] == "TITLE"
          return true
        end
        oldTitle = channel.title
        # debugger
        if channel.update(request_data["channel"])
          i = 0;
          channel.users.each do |user|
            send_channel_success(user, channel)
            # ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id, created_at: channel.created_at,topic: channel.topic, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
          end
          
          if request_data["type"] == "TOPIC" 
            message = channel.messages.new(body: "set the channel topic: #{channel.topic}", sender_id: current_user.id, is_auto_message: true)
          elsif request_data["type"] == "TITLE"
            message = channel.messages.new(body: "renamed the channel from: \"#{oldTitle}\" to \"#{channel.title}\"", sender_id: current_user.id, is_auto_message: true)
          end
          if(message && message.save)
            MessagesChannel.broadcast_to(channel,  {type: "NEW_MESSAGE", message: message});
          else
            # debugger
          end
          # ActionCable.server.broadcast({type: "CHANNEL_SUCCESS", author_id: current_user.id, channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
        end
      when "ADD_USERS_TO_CHANNEL"
        users_to_add = request_data["selectedUsers"]
        channel = Channel.includes(:users).find_by(id: request_data["channel_id"])
        users = User.where(id: users_to_add)
        # debugger
        if users_to_add && users && channel
          channel.users.concat(users)
          users.each do |user|
            send_channel_success(user, channel)
            # ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id,topic: channel.topic, created_at: channel.created_at,channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
          end     
          channel.users.includes(:channels, :messages).each do |user|
            send_user_add(user)
          end
        end
      when "ADD_USER_TO_CHANNEL"
        user = User.find_by(id: request_data["user_id"])
        channel = Channel.includes(:users).find_by(id: request_data["channel_id"])
        if user && channel
          channel.users << user
          send_channel_success(user, channel)
          # ClientsChannel.broadcast_to(user, {type: "CHANNEL_SUCCESS", author_id: current_user.id,topic: channel.topic, created_at: channel.created_at,channel: {id: channel.id, title: channel.title,purpose: channel.purpose, user_ids: channel.users.ids}})
        end
        channel.users.includes(:channels, :messages).each do |user|
          send_user_add(user)
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
