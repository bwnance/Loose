class ApplicationController < ActionController::Base
    helper_method :logged_in?, :current_user

    def login!(user)
        session[:session_token] = user.reset_session_token!
    end
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end
    def logged_in?
        !!current_user
        
    end
    def logout!
        current_user.reset_session_token!
        @current_user = nil
        session[:session_token] = nil

    end
    def ensure_logged_in
        if logged_in?
            yield
        end
        @errors = ["You are not logged in"]
        render 'api/errors/errors', status: 403
    end

end
