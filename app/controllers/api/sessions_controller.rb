class Api::SessionsController < ApplicationController
    include ApplicationHelper
    def create
        @user = User.find_by_credentials(session_params[:email], session_params[:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            @errors = ["Invalid email or password"]
            render 'api/errors/login_errors', status: 422
        end
    end

    def destroy
        if current_user
            logout!
            render json: {}, status: :ok
        else
            render json: {error: "You must be logged in to logout!"}, status: 404
        end
    end

    def check_email
        email = params[:email]
        unless is_email?(email)
            @errors = ["Whoops. That's not an email!"]
            render 'api/errors/errors', status: 422
        else
            @user = {email: email, exists: !!User.find_by(email: email)}
            render '/api/users/email'
        end
    end
    
    def session_params
        params.require(:user).permit(:email, :password)
    end
end
