class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(session_params[:email], session_params[:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else
            @errors = ["Invalid email or password"]
            render 'api/errors/errors', status: 422
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
    def session_params
        params.require(:user).permit(:email, :password)
    end
end
