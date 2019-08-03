module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      puts "hello!"
      self.current_user = User.find_by(session_token: request.session[:session_token])
      reject_unauthorized_connection unless self.current_user
    end
    def disconnect
      self.current_user = nil;
      ActionCable.server.remote_connections.where(current_user: self.current_user).disconnect
    end
  end
end
