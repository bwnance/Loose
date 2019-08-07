module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      puts "hello!"
      self.current_user = User.find_by(session_token: request.session[:session_token])
      reject_unauthorized_connection unless self.current_user
      sendNewUserMessage
    end
    def sendNewUserMessage
      updatedUsers = []
      ActionCable.server.connections.each do |connection|
        # debugger
        connection.subscriptions.identifiers.each_with_index do |identifier|
          hash = JSON.parse(identifier)
          if hash["channel"] == "ClientsChannel"
            user = User.find_by(hash[id: "user_id"])
            if user && !updatedUsers.include?(user.id)
              # debugger
              updatedUsers << user.id
              # console.log(user)
              ClientsChannel.broadcast_to(user, {type: "USER_ADD", user: {id: current_user.id, username: current_user.username, full_name: current_user.full_name, channel_ids: current_user.channels.ids, message_ids: current_user.messages.ids}})
            end
          end
        end
      end
    end
    def disconnect
      self.current_user = nil;
      ActionCable.server.remote_connections.where(current_user: self.current_user).disconnect
    end
  end
end
