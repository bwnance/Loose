module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      puts "hello!"
      self.current_user = User.find_by(session_token: request.session[:session_token])
      # ActionCable.server.remote_connections.where(current_user: self.current_user).disconnect()
      reject_unauthorized_connection unless self.current_user
      sendNewUserMessage
    end
    def sendNewUserMessage
      updatedUsers = []
      i = 0
      totalUsers = []

      ActionCable.server.open_connections_statistics.each do |stat|
        stat[:subscriptions].each do |subscription|
          hash = JSON.parse(subscription)
          if hash["channel"] == "ClientsChannel"
            user = User.find_by(id: hash["user_id"])
            totalUsers << user
            if user && !updatedUsers.include?(user.id)
              # debugger
              # puts user.full_name
              # debugger
              updatedUsers << user.id
              # console.log(user)
              ClientsChannel.broadcast_to(user, {type: "USER_ADD", user: {id: current_user.id, username: current_user.username, full_name: current_user.full_name, channel_ids: current_user.channels.ids, message_ids: current_user.messages.ids}})
            end
          end
        end
      end
      # debugger

          
      
      puts i
    end
    def disconnect
      # debugger
      ActionCable.server.remote_connections.where(current_user: self.current_user).disconnect()
      self.current_user = nil;
    end
  end
end
